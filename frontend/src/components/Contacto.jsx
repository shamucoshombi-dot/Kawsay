import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
    ArrowUpRight,
    Instagram,
    Leaf,
    Phone,
    Send,
} from "lucide-react";
import { Reveal, SectionTag } from "./Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const NUMERO = "+51 993 929 294";

const WhatsAppIcon = ({ className = "" }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
);

const CANALES = [
    {
        icon: Phone,
        titulo: "Contacto del proyecto",
        valor: NUMERO,
        testid: "contact-channel-proyecto",
        cardCls: "bg-kawsay-sage/45 border-kawsay-leaf/30",
        iconCls: "bg-kawsay-pine/10 text-kawsay-pine",
    },
    {
        icon: WhatsAppIcon,
        titulo: "WhatsApp",
        valor: NUMERO,
        link: "https://wa.me/51993929294",
        linkLabel: "Abrir WhatsApp",
        testid: "contact-channel-whatsapp",
        cardCls: "bg-[#EDF4DE] border-kawsay-olive/35",
        iconCls: "bg-kawsay-olive/15 text-kawsay-olive",
    },
    {
        icon: Instagram,
        titulo: "Instagram del proyecto",
        valor: "Por compartir próximamente",
        testid: "contact-channel-instagram",
        cardCls: "bg-[#FBF3E6] border-kawsay-brown/25",
        iconCls: "bg-kawsay-brown/10 text-kawsay-brown",
    },
];

const MOTIVOS = ["Sugerir una idea", "Dejar un comentario", "Realizar una consulta"];

const EMPTY = { nombre: "", medio_contacto: "", motivo: "", mensaje: "" };

const inputCls =
    "w-full rounded-2xl border border-kawsay-line bg-kawsay-ivory/60 px-4 py-3 text-[15px] font-semibold text-kawsay-ink placeholder:font-normal placeholder:text-kawsay-bark/50 outline-none transition-all duration-200 focus:border-kawsay-olive focus:ring-4 focus:ring-kawsay-olive/15";

export default function Contacto() {
    const [form, setForm] = useState(EMPTY);
    const [sending, setSending] = useState(false);

    const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    const submit = async (e) => {
        e.preventDefault();
        if (sending) return;
        setSending(true);
        try {
            await axios.post(`${API}/contact`, { ...form });
            toast.success("¡Mensaje enviado! Gracias por escribirnos.", {
                description: "El equipo de Kawsay lo revisará pronto.",
            });
            setForm(EMPTY);
        } catch {
            toast.error("No se pudo enviar el mensaje. Inténtalo nuevamente.");
        } finally {
            setSending(false);
        }
    };

    return (
        <section
            id="contactanos"
            className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28"
        >
            <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="absolute -right-24 top-16 h-64 w-64 rounded-full bg-kawsay-sage/70 blur-2xl" />
                <Leaf className="absolute left-[5%] top-24 h-9 w-9 -rotate-12 text-kawsay-moss/40" />
                <Leaf className="absolute bottom-16 right-[6%] h-12 w-12 rotate-12 text-kawsay-leaf/25" />
            </div>
            <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
                <Reveal>
                    <SectionTag>Contáctanos</SectionTag>
                </Reveal>
                <Reveal delay={0.08}>
                    <h2 className="mt-5 max-w-2xl font-display text-3xl font-semibold leading-tight text-kawsay-forest sm:text-4xl lg:text-5xl">
                        Conversemos sobre Kawsay
                    </h2>
                </Reveal>
                <Reveal delay={0.14}>
                    <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-kawsay-bark">
                        Escríbenos para realizar consultas, dejar comentarios, sugerir
                        ideas o comunicarte con el proyecto y la docente que lo acompaña.
                    </p>
                </Reveal>

                <div className="mt-12 grid gap-8 lg:grid-cols-12">
                    <div className="space-y-4 lg:col-span-5">
                        {CANALES.map((c, i) => (
                            <Reveal key={c.titulo} delay={0.05 + i * 0.07}>
                                <div
                                    data-testid={c.testid}
                                    className={`flex items-center gap-4 rounded-[1.75rem] border p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-kawsay-olive/60 hover:shadow-soft ${c.cardCls}`}
                                >
                                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${c.iconCls}`}>
                                        <c.icon className="h-5 w-5" />
                                    </span>
                                    <div className="min-w-0 flex-1">
                                        <p className="font-display text-base font-semibold text-kawsay-forest">
                                            {c.titulo}
                                        </p>
                                        <p className="text-sm font-semibold text-kawsay-bark/70">
                                            {c.valor}
                                        </p>
                                        {c.link && (
                                            <a
                                                href={c.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                data-testid="whatsapp-link-button"
                                                className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-kawsay-olive px-3.5 py-1.5 text-xs font-bold text-kawsay-ivory shadow-sm transition-colors duration-300 hover:bg-kawsay-pine"
                                            >
                                                {c.linkLabel}
                                                <ArrowUpRight className="h-3.5 w-3.5" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                        <Reveal delay={0.25}>
                            <div className="rounded-[1.75rem] border border-dashed border-kawsay-line bg-kawsay-ivory/70 p-5">
                                <p className="text-sm leading-relaxed text-kawsay-bark/70">
                                    El Instagram del proyecto se agregará próximamente.
                                </p>
                            </div>
                        </Reveal>
                    </div>

                    <Reveal delay={0.1} className="lg:col-span-7">
                        <form
                            data-testid="contact-form"
                            onSubmit={submit}
                            className="rounded-[2rem] border-2 border-kawsay-leaf/25 bg-white p-6 shadow-soft sm:p-8"
                        >
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="c-nombre" className="mb-2 block text-sm font-bold text-kawsay-forest">
                                        Nombre
                                    </label>
                                    <input
                                        id="c-nombre"
                                        data-testid="contact-input-nombre"
                                        className={inputCls}
                                        placeholder="Tu nombre"
                                        value={form.nombre}
                                        onChange={set("nombre")}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="c-medio" className="mb-2 block text-sm font-bold text-kawsay-forest">
                                        Medio de contacto
                                    </label>
                                    <input
                                        id="c-medio"
                                        data-testid="contact-input-medio"
                                        className={inputCls}
                                        placeholder="Correo o teléfono"
                                        value={form.medio_contacto}
                                        onChange={set("medio_contacto")}
                                        required
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="c-motivo" className="mb-2 block text-sm font-bold text-kawsay-forest">
                                        Motivo del contacto
                                    </label>
                                    <select
                                        id="c-motivo"
                                        data-testid="contact-input-motivo"
                                        className={inputCls}
                                        value={form.motivo}
                                        onChange={set("motivo")}
                                        required
                                    >
                                        <option value="" disabled>
                                            Elige un motivo
                                        </option>
                                        {MOTIVOS.map((m) => (
                                            <option key={m} value={m}>
                                                {m}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="c-mensaje" className="mb-2 block text-sm font-bold text-kawsay-forest">
                                        Mensaje
                                    </label>
                                    <textarea
                                        id="c-mensaje"
                                        data-testid="contact-input-mensaje"
                                        rows={4}
                                        className={`${inputCls} resize-none`}
                                        placeholder="Escribe tu mensaje aquí..."
                                        value={form.mensaje}
                                        onChange={set("mensaje")}
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                data-testid="contact-submit-button"
                                disabled={sending}
                                className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-kawsay-pine px-7 py-3.5 font-display text-base font-semibold text-kawsay-ivory shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-kawsay-forest hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                            >
                                {sending ? "Enviando..." : "Enviar"}
                                <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </button>
                        </form>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
