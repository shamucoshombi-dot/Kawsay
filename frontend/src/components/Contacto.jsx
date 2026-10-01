import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Instagram, MessageCircle, Phone, Send, X } from "lucide-react";
import { Reveal, SectionTag } from "./Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const CANALES = [
    { icon: Phone, titulo: "Número de la profesora", valor: "Por compartir próximamente", testid: "contact-channel-teacher" },
    { icon: MessageCircle, titulo: "WhatsApp del proyecto", valor: "Por compartir próximamente", testid: "contact-channel-whatsapp" },
    { icon: Instagram, titulo: "Instagram del proyecto", valor: "Por compartir próximamente", testid: "contact-channel-instagram" },
];

const MOTIVOS = ["Comprar productos", "Colaborar con la iniciativa", "Sugerir ideas"];

const EMPTY = { nombre: "", medio_contacto: "", motivo: "", mensaje: "" };

const inputCls =
    "w-full rounded-2xl border border-kawsay-line bg-kawsay-ivory/60 px-4 py-3 text-[15px] font-semibold text-kawsay-ink placeholder:font-normal placeholder:text-kawsay-bark/50 outline-none transition-all duration-200 focus:border-kawsay-olive focus:ring-4 focus:ring-kawsay-olive/15";

export default function Contacto({ interes, onClearInteres }) {
    const [form, setForm] = useState(EMPTY);
    const [sending, setSending] = useState(false);

    const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    const submit = async (e) => {
        e.preventDefault();
        if (sending) return;
        setSending(true);
        try {
            await axios.post(`${API}/contact`, { ...form, diseno_interes: interes || null });
            toast.success("¡Mensaje enviado! Gracias por escribirnos.", {
                description: "El equipo de Kawsay lo revisará pronto.",
            });
            setForm(EMPTY);
            onClearInteres?.();
        } catch {
            toast.error("No se pudo enviar el mensaje. Inténtalo nuevamente.");
        } finally {
            setSending(false);
        }
    };

    return (
        <section id="contactanos" className="scroll-mt-20 py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-5 sm:px-8">
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
                        Escríbenos para comprar productos, colaborar con la iniciativa o
                        sugerir ideas. Los datos de contacto se incorporarán
                        próximamente.
                    </p>
                </Reveal>

                <div className="mt-12 grid gap-8 lg:grid-cols-12">
                    <div className="space-y-4 lg:col-span-5">
                        {CANALES.map((c, i) => (
                            <Reveal key={c.titulo} delay={0.05 + i * 0.07}>
                                <div
                                    data-testid={c.testid}
                                    className="flex items-center gap-4 rounded-[1.75rem] border border-kawsay-line bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-kawsay-olive/50 hover:shadow-soft"
                                >
                                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-kawsay-leaf/10 text-kawsay-leaf">
                                        <c.icon className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <p className="font-display text-base font-semibold text-kawsay-forest">
                                            {c.titulo}
                                        </p>
                                        <p className="text-sm font-semibold text-kawsay-bark/60">
                                            {c.valor}
                                        </p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                        <Reveal delay={0.25}>
                            <div className="rounded-[1.75rem] border border-dashed border-kawsay-line bg-kawsay-ivory/70 p-5">
                                <p className="text-sm leading-relaxed text-kawsay-bark/70">
                                    Los números y enlaces reales aún no han sido
                                    proporcionados. Este espacio está preparado para
                                    sustituirlos fácilmente.
                                </p>
                            </div>
                        </Reveal>
                    </div>

                    <Reveal delay={0.1} className="lg:col-span-7">
                        <form
                            data-testid="contact-form"
                            onSubmit={submit}
                            className="rounded-[2rem] border border-kawsay-line bg-white p-6 shadow-soft sm:p-8"
                        >
                            {interes && (
                                <div
                                    data-testid="contact-interest-chip"
                                    className="mb-5 inline-flex items-center gap-2 rounded-full bg-kawsay-olive/10 px-4 py-2 text-sm font-bold text-kawsay-olive"
                                >
                                    Interés: {interes}
                                    <button
                                        type="button"
                                        data-testid="contact-interest-clear"
                                        onClick={onClearInteres}
                                        aria-label="Quitar interés"
                                        className="rounded-full p-0.5 transition-colors hover:bg-kawsay-olive/20"
                                    >
                                        <X className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            )}
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
                                        Motivo de contacto
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
                                className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-kawsay-olive px-7 py-3.5 font-display text-base font-semibold text-kawsay-ivory shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-kawsay-pine hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
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
