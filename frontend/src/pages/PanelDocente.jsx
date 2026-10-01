import { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "sonner";
import {
    ArrowLeft,
    Check,
    Inbox,
    Lock,
    LogOut,
    RefreshCw,
    Sprout,
} from "lucide-react";
import { Link } from "react-router-dom";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

function formatApiErrorDetail(detail) {
    if (detail == null) return "Algo salió mal. Inténtalo de nuevo.";
    if (typeof detail === "string") return detail;
    if (Array.isArray(detail))
        return detail
            .map((e) => (e && typeof e.msg === "string" ? e.msg : JSON.stringify(e)))
            .filter(Boolean)
            .join(" ");
    if (detail && typeof detail.msg === "string") return detail.msg;
    return String(detail);
}

function formatDate(iso) {
    try {
        return new Date(iso).toLocaleString("es-PE", {
            dateStyle: "medium",
            timeStyle: "short",
        });
    } catch {
        return iso;
    }
}

const inputCls =
    "w-full rounded-2xl border border-kawsay-line bg-kawsay-ivory/60 px-4 py-3 text-[15px] font-semibold text-kawsay-ink placeholder:font-normal placeholder:text-kawsay-bark/50 outline-none transition-all duration-200 focus:border-kawsay-olive focus:ring-4 focus:ring-kawsay-olive/15";

export default function PanelDocente() {
    const [user, setUser] = useState(null); // null = verificando, false = no autenticado, objeto = ok
    const [messages, setMessages] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);

    const loadMessages = async () => {
        try {
            const { data } = await axios.get(`${API}/contact`, { withCredentials: true });
            setMessages(data);
        } catch (e) {
            if (e.response?.status === 401) {
                setUser(false);
                return;
            }
            toast.error("No se pudieron cargar los mensajes.");
        }
    };

    useEffect(() => {
        axios
            .get(`${API}/auth/me`, { withCredentials: true })
            .then(({ data }) => {
                setUser(data);
                loadMessages();
            })
            .catch(() => setUser(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const login = async (e) => {
        e.preventDefault();
        if (busy) return;
        setBusy(true);
        setError("");
        try {
            const { data } = await axios.post(
                `${API}/auth/login`,
                { email, password },
                { withCredentials: true },
            );
            setUser(data);
            toast.success("Bienvenida/o de nuevo.");
            loadMessages();
        } catch (err) {
            setError(formatApiErrorDetail(err.response?.data?.detail));
        } finally {
            setBusy(false);
        }
    };

    const markRead = async (m) => {
        try {
            await axios.put(`${API}/contact/${m.id}/read`, {}, { withCredentials: true });
            setMessages((ms) => ms.map((x) => (x.id === m.id ? { ...x, leido: true } : x)));
        } catch {
            toast.error("No se pudo actualizar el mensaje.");
        }
    };

    const logout = async () => {
        await axios.post(`${API}/auth/logout`, {}, { withCredentials: true }).catch(() => {});
        setUser(false);
        setMessages([]);
        setEmail("");
        setPassword("");
    };

    const unread = messages.filter((m) => !m.leido).length;

    return (
        <div className="min-h-screen bg-kawsay-sage/40 font-body text-kawsay-ink">
            <Toaster position="bottom-right" richColors closeButton />
            <header className="border-b border-kawsay-line/70 bg-kawsay-ivory/90 backdrop-blur-md">
                <div className="mx-auto flex h-[72px] max-w-4xl items-center justify-between px-5 sm:px-8">
                    <Link
                        to="/"
                        data-testid="panel-back-link"
                        className="flex items-center gap-2 font-display text-sm font-semibold text-kawsay-bark transition-colors hover:text-kawsay-forest"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Volver al sitio
                    </Link>
                    {user && (
                        <div className="flex items-center gap-3">
                            <button
                                data-testid="panel-refresh-button"
                                onClick={loadMessages}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-kawsay-line bg-white/80 text-kawsay-forest transition-colors hover:bg-kawsay-sand/50"
                                aria-label="Actualizar mensajes"
                            >
                                <RefreshCw className="h-4 w-4" />
                            </button>
                            <button
                                data-testid="panel-logout-button"
                                onClick={logout}
                                className="flex items-center gap-2 rounded-full border border-kawsay-line bg-white/80 px-4 py-2 font-display text-sm font-semibold text-kawsay-forest transition-colors hover:bg-kawsay-sand/50"
                            >
                                <LogOut className="h-4 w-4" />
                                Salir
                            </button>
                        </div>
                    )}
                </div>
            </header>

            <main className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
                {user === null && (
                    <p className="text-center font-display text-lg text-kawsay-bark">
                        Verificando sesión...
                    </p>
                )}

                {user === false && (
                    <form
                        data-testid="panel-login-form"
                        onSubmit={login}
                        className="mx-auto max-w-md rounded-[2rem] border border-kawsay-line bg-white p-7 shadow-soft sm:p-9"
                    >
                        <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-kawsay-leaf/10 text-kawsay-leaf">
                            <Lock className="h-6 w-6" />
                        </span>
                        <h1 className="text-center font-display text-2xl font-semibold text-kawsay-forest">
                            Panel docente
                        </h1>
                        <p className="mt-2 text-center text-sm leading-relaxed text-kawsay-bark/80">
                            Ingresa con las credenciales de docente para ver los mensajes
                            recibidos desde la página.
                        </p>
                        <div className="mt-6 space-y-4">
                            <div>
                                <label htmlFor="p-email" className="mb-2 block text-sm font-bold text-kawsay-forest">
                                    Correo
                                </label>
                                <input
                                    id="p-email"
                                    data-testid="panel-email-input"
                                    type="email"
                                    className={inputCls}
                                    placeholder="correo del docente"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="p-password" className="mb-2 block text-sm font-bold text-kawsay-forest">
                                    Contraseña
                                </label>
                                <input
                                    id="p-password"
                                    data-testid="panel-password-input"
                                    type="password"
                                    className={inputCls}
                                    placeholder="contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {error && (
                                <p
                                    data-testid="panel-login-error"
                                    className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-kawsay-peru"
                                >
                                    {error}
                                </p>
                            )}
                            <button
                                type="submit"
                                data-testid="panel-login-button"
                                disabled={busy}
                                className="w-full rounded-full bg-kawsay-olive px-6 py-3 font-display text-base font-semibold text-kawsay-ivory shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-kawsay-pine disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {busy ? "Ingresando..." : "Ingresar"}
                            </button>
                        </div>
                    </form>
                )}

                {user && (
                    <div data-testid="panel-messages-view">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <h1 className="font-display text-3xl font-semibold text-kawsay-forest">
                                    Mensajes recibidos
                                </h1>
                                <p className="mt-1 flex items-center gap-2 text-sm font-bold text-kawsay-bark/70">
                                    <Sprout className="h-4 w-4 text-kawsay-leaf" />
                                    {unread > 0
                                        ? `${unread} mensaje${unread === 1 ? "" : "s"} sin leer`
                                        : "Todo leído"}
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 space-y-4">
                            {messages.length === 0 && (
                                <div
                                    data-testid="panel-empty-state"
                                    className="flex flex-col items-center gap-3 rounded-[2rem] border border-dashed border-kawsay-line bg-white/70 p-12 text-center"
                                >
                                    <Inbox className="h-8 w-8 text-kawsay-moss" />
                                    <p className="font-display text-lg font-semibold text-kawsay-forest">
                                        Todavía no hay mensajes
                                    </p>
                                    <p className="max-w-xs text-sm text-kawsay-bark/70">
                                        Cuando alguien escriba desde la sección
                                        Contáctanos, aparecerá aquí.
                                    </p>
                                </div>
                            )}

                            {messages.map((m, i) => (
                                <article
                                    key={m.id}
                                    data-testid={`panel-message-card-${i + 1}`}
                                    className={`rounded-[1.75rem] border bg-white p-6 transition-all duration-300 sm:p-7 ${
                                        m.leido
                                            ? "border-kawsay-line"
                                            : "border-kawsay-olive/50 shadow-soft"
                                    }`}
                                >
                                    <div className="flex flex-wrap items-start justify-between gap-3">
                                        <div>
                                            <p className="font-display text-lg font-semibold text-kawsay-forest">
                                                {m.nombre}
                                                {!m.leido && (
                                                    <span className="ml-3 inline-flex items-center rounded-full bg-kawsay-olive px-2.5 py-0.5 align-middle text-[11px] font-bold uppercase tracking-wider text-kawsay-ivory">
                                                        Nuevo
                                                    </span>
                                                )}
                                            </p>
                                            <p className="mt-0.5 text-sm font-semibold text-kawsay-bark/70">
                                                {m.medio_contacto}
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="rounded-full bg-kawsay-sage px-3 py-1 text-xs font-bold text-kawsay-pine">
                                                {m.motivo}
                                            </span>
                                            {m.diseno_interes && (
                                                <span
                                                    data-testid={`panel-message-design-${i + 1}`}
                                                    className="rounded-full bg-kawsay-brown/10 px-3 py-1 text-xs font-bold text-kawsay-brown"
                                                >
                                                    {m.diseno_interes}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <p className="mt-4 text-[15px] leading-relaxed text-kawsay-bark">
                                        {m.mensaje}
                                    </p>
                                    <div className="mt-4 flex items-center justify-between gap-3">
                                        <p className="text-xs font-semibold text-kawsay-bark/50">
                                            {formatDate(m.fecha)}
                                        </p>
                                        {!m.leido && (
                                            <button
                                                data-testid={`panel-mark-read-${i + 1}`}
                                                onClick={() => markRead(m)}
                                                className="flex items-center gap-2 rounded-full bg-kawsay-ivory px-4 py-2 font-display text-sm font-semibold text-kawsay-forest ring-1 ring-inset ring-kawsay-line transition-all duration-300 hover:bg-kawsay-olive hover:text-kawsay-ivory hover:ring-kawsay-olive"
                                            >
                                                <Check className="h-4 w-4" />
                                                Marcar como leído
                                            </button>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
