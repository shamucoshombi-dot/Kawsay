# Auth Testing — Kawsay Panel Docente

Read this before testing authentication.

- Admin (teacher) account: see `/app/memory/test_credentials.md` (ADMIN_EMAIL / ADMIN_PASSWORD from backend/.env).
- Endpoints: POST /api/auth/login (sets httpOnly access_token + refresh_token cookies, also returns access_token in body), POST /api/auth/logout, GET /api/auth/me, POST /api/auth/refresh.
- Protected: GET /api/contact (list messages) and PUT /api/contact/{id}/read require cookie or Bearer token. POST /api/contact stays public.
- Brute force: 5 failed logins per ip:email → 15 min lockout (login_attempts collection).
- Seed: on startup, teacher user is created/updated from ADMIN_EMAIL/ADMIN_PASSWORD in backend/.env; users.email has a unique index.
- Curl test (http): login returns access_token in body — use it as Bearer header, since secure cookies are not sent over plain http:
  TOKEN=$(curl -s -X POST http://localhost:8001/api/auth/login -H "Content-Type: application/json" -d '{"email":"<admin>","password":"<pass>"}' | python3 -c "import sys,json;print(json.load(sys.stdin)['access_token'])")
  curl -s http://localhost:8001/api/contact -H "Authorization: Bearer $TOKEN"
- Verify hash: db.users.findOne({role:"docente"}).password_hash starts with $2b$.
