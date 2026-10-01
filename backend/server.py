from fastapi import FastAPI, APIRouter, Depends, HTTPException, Request, Response
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, BeforeValidator
from typing import Annotated, List, Optional
from bson import ObjectId
import bcrypt
import jwt
import uuid
from datetime import datetime, timedelta, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# --- MongoDB adherence helpers ---
def coerce_object_id(v):
    if isinstance(v, ObjectId):
        return str(v)
    return v


PyObjectId = Annotated[str, BeforeValidator(coerce_object_id)]


class BaseDocument(BaseModel):
    model_config = ConfigDict(extra="ignore", populate_by_name=True)

    id: Optional[PyObjectId] = Field(default=None, alias="_id")

    def to_mongo(self):
        return self.model_dump(by_alias=True, exclude_none=True)

    @classmethod
    def from_mongo(cls, doc):
        return cls(**doc)


# --- Auth helpers (JWT + bcrypt) ---
JWT_ALGORITHM = "HS256"


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))


def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(minutes=15),
        "type": "access",
    }
    return jwt.encode(payload, os.environ["JWT_SECRET"], algorithm=JWT_ALGORITHM)


def create_refresh_token(user_id: str) -> str:
    payload = {
        "sub": user_id,
        "exp": datetime.now(timezone.utc) + timedelta(days=7),
        "type": "refresh",
    }
    return jwt.encode(payload, os.environ["JWT_SECRET"], algorithm=JWT_ALGORITHM)


async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, os.environ["JWT_SECRET"], algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        user["_id"] = str(user["_id"])
        user.pop("password_hash", None)
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


def _attempt_identifier(request: Request, email: str) -> str:
    ip = request.client.host if request.client else "unknown"
    return f"{ip}:{email}"


async def is_locked(identifier: str) -> bool:
    doc = await db.login_attempts.find_one({"identifier": identifier})
    if not doc:
        return False
    last = doc.get("last_attempt")
    if last is None:
        return False
    return doc.get("count", 0) >= 5 and datetime.now(timezone.utc) - last < timedelta(minutes=15)


async def record_failed_attempt(identifier: str):
    await db.login_attempts.update_one(
        {"identifier": identifier},
        {"$inc": {"count": 1}, "$set": {"last_attempt": datetime.now(timezone.utc)}},
        upsert=True,
    )


async def clear_attempts(identifier: str):
    await db.login_attempts.delete_many({"identifier": identifier})


# --- Models ---
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactMessageCreate(BaseModel):
    nombre: str = Field(min_length=1, max_length=120)
    medio_contacto: str = Field(min_length=1, max_length=160)
    motivo: str = Field(min_length=1, max_length=120)
    mensaje: str = Field(min_length=1, max_length=2000)
    diseno_interes: Optional[str] = Field(default=None, max_length=60)


class LoginInput(BaseModel):
    email: str = Field(min_length=3, max_length=160)
    password: str = Field(min_length=1, max_length=128)


class ContactMessage(BaseDocument):
    nombre: str
    medio_contacto: str
    motivo: str
    mensaje: str
    diseno_interes: Optional[str] = None
    leido: bool = False
    fecha: str


# --- Routes ---
@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(client_name=input.client_name)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/contact")
async def create_contact_message(input: ContactMessageCreate):
    msg = ContactMessage(
        **input.model_dump(),
        fecha=datetime.now(timezone.utc).isoformat(),
    )
    result = await db.contact_messages.insert_one(msg.to_mongo())
    return {"ok": True, "id": str(result.inserted_id), "mensaje": "Mensaje recibido"}


@api_router.get("/contact", response_model=List[ContactMessage], response_model_by_alias=False)
async def list_contact_messages(user: dict = Depends(get_current_user)):
    docs = await db.contact_messages.find().sort("fecha", -1).to_list(200)
    return [ContactMessage.from_mongo(d) for d in docs]


@api_router.put("/contact/{message_id}/read")
async def mark_message_read(message_id: str, user: dict = Depends(get_current_user)):
    try:
        oid = ObjectId(message_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Id inválido")
    result = await db.contact_messages.update_one({"_id": oid}, {"$set": {"leido": True}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Mensaje no encontrado")
    return {"ok": True}


def _origin_allowed(origin: str) -> bool:
    allowed = os.environ.get("CORS_ORIGINS", "*").split(",")
    if "*" in allowed or origin in allowed:
        return True
    # los proxies de preview de la plataforma reescriben el Origin a dominios internos
    return origin.endswith(".preview.emergentcf.cloud") or origin.endswith(
        ".preview.emergentagent.com"
    )


@api_router.post("/auth/login")
async def auth_login(request: Request, response: Response, input: LoginInput):
    origin = request.headers.get("origin")
    if origin and not _origin_allowed(origin):
        raise HTTPException(status_code=403, detail="Origen no permitido")
    email = input.email.strip().lower()
    identifier = _attempt_identifier(request, email)
    if await is_locked(identifier):
        raise HTTPException(status_code=429, detail="Demasiados intentos fallidos. Espera 15 minutos e inténtalo de nuevo.")
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(input.password, user.get("password_hash", "")):
        await record_failed_attempt(identifier)
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")
    await clear_attempts(identifier)
    user_id = str(user["_id"])
    access = create_access_token(user_id, email)
    refresh = create_refresh_token(user_id)
    response.set_cookie(key="access_token", value=access, httponly=True, secure=True, samesite="none", max_age=900, path="/")
    response.set_cookie(key="refresh_token", value=refresh, httponly=True, secure=True, samesite="none", max_age=604800, path="/")
    return {
        "email": email,
        "name": user.get("name", "Docente"),
        "role": user.get("role", "docente"),
        "access_token": access,
    }


@api_router.post("/auth/logout")
async def auth_logout(response: Response):
    response.delete_cookie(key="access_token", path="/")
    response.delete_cookie(key="refresh_token", path="/")
    return {"ok": True}


@api_router.get("/auth/me")
async def auth_me(user: dict = Depends(get_current_user)):
    return user


@api_router.post("/auth/refresh")
async def auth_refresh(request: Request, response: Response):
    token = request.cookies.get("refresh_token")
    if not token:
        raise HTTPException(status_code=401, detail="No refresh token")
    try:
        payload = jwt.decode(token, os.environ["JWT_SECRET"], algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        access = create_access_token(str(user["_id"]), user.get("email", ""))
        response.set_cookie(key="access_token", value=access, httponly=True, secure=True, samesite="none", max_age=900, path="/")
        return {"ok": True, "access_token": access}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def seed_auth():
    await db.users.create_index("email", unique=True)
    await db.login_attempts.create_index("identifier")
    admin_email = os.environ.get("ADMIN_EMAIL", "")
    admin_password = os.environ.get("ADMIN_PASSWORD", "")
    if admin_email and admin_password:
        existing = await db.users.find_one({"email": admin_email})
        hashed = hash_password(admin_password)
        if existing is None:
            await db.users.insert_one({
                "email": admin_email,
                "password_hash": hashed,
                "name": "Docente",
                "role": "docente",
                "created_at": datetime.now(timezone.utc),
            })
        elif not verify_password(admin_password, existing["password_hash"]):
            await db.users.update_one(
                {"email": admin_email},
                {"$set": {"password_hash": hashed}},
            )


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
