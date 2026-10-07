import { GraduationCap, Info, MessageCircle, UserRound } from "lucide-react";

const RESERVADOS = [
    { icon: UserRound, label: "Área", valor: "DPCC", testid: "footer-slot-area" },
    { icon: GraduationCap, label: "Docente", valor: "Patricia Vega Cruz", testid: "footer-slot-docente" },
    { icon: MessageCircle, label: "WhatsApp", valor: "+51 901 466 082", testid: "footer-slot-whatsapp" },
    { icon: Info, label: "Institución Educativa Emblemática", valor: "Alfonso Ugarte", testid: "footer-slot-institucion" },
];

export default function Footer() {
    return (
        <footer className="relative overflow-hidden bg-kawsay-forest text-kawsay-ivory">
            <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-kawsay-moss/15 blur-2xl"
            />
            <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
                <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                        <img
                            src="/kawsay-logo.png"
                            alt="Logo de Kawsay"
                            className="h-20 w-auto rounded-2xl bg-kawsay-ivory/95 p-1.5"
                        />
                        <div>
                            <p className="font-display text-2xl font-semibold tracking-wide">
                                KAWSAY
                            </p>
                            <p className="mt-1 max-w-xs text-sm leading-relaxed text-kawsay-ivory/70">
                                Iniciativa estudiantil desarrollada mediante STEAM + H
                            </p>
                            <p className="mt-2 text-sm font-bold text-kawsay-moss">
                                Alumnos del Alfonso Ugarte
                            </p>
                        </div>
                    </div>

                    <div className="grid w-full max-w-md grid-cols-2 gap-3 md:w-auto">
                        {RESERVADOS.map((r) => (
                            <div
                                key={r.testid}
                                data-testid={r.testid}
                                className="flex items-center gap-2.5 rounded-2xl border border-kawsay-ivory/15 bg-kawsay-ivory/5 px-4 py-3"
                            >
                                <r.icon className="h-4 w-4 shrink-0 text-kawsay-moss" />
                                <div>
                                    <p className="text-sm font-bold">{r.label}</p>
                                    <p className="text-xs font-bold text-kawsay-moss">
                                        {r.valor}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-kawsay-ivory/15 pt-6 text-xs text-kawsay-ivory/50 sm:flex-row sm:items-center">
                    <p>© {new Date().getFullYear()} Kawsay · Proyecto estudiantil</p>
                    <a
                        href="/panel"
                        data-testid="footer-panel-link"
                        className="font-bold text-kawsay-moss underline decoration-kawsay-moss/50 underline-offset-4 transition-colors hover:text-kawsay-ivory"
                    >
                        Panel docente
                    </a>
                </div>
            </div>
        </footer>
    );
}
