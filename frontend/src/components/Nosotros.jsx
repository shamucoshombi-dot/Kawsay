import { motion } from "framer-motion";
import { FlaskConical, HeartHandshake, Leaf, Package } from "lucide-react";
import { Reveal, SectionTag } from "./Reveal";
import PlaceholderImage from "./PlaceholderImage";

const DISCIPLINAS = [
    { letra: "S", nombre: "Ciencia", circle: "bg-kawsay-pine", borde: "border-kawsay-pine/30" },
    { letra: "T", nombre: "Tecnología", circle: "bg-kawsay-olive", borde: "border-kawsay-olive/40" },
    { letra: "E", nombre: "Ingeniería", circle: "bg-kawsay-brown", borde: "border-kawsay-brown/30" },
    { letra: "A", nombre: "Arte", circle: "bg-kawsay-moss", borde: "border-kawsay-moss/50" },
    { letra: "M", nombre: "Matemática", circle: "bg-kawsay-leaf", borde: "border-kawsay-leaf/35" },
    { letra: "H", nombre: "Humanidades", circle: "bg-kawsay-forest", borde: "border-kawsay-forest/25" },
];

const Card = ({ icon: Icon, title, children, delay = 0, tint = "bg-white", iconCls = "bg-kawsay-leaf/10 text-kawsay-leaf" }) => (
    <Reveal delay={delay} className="h-full">
        <div className={`group h-full rounded-[2rem] border border-kawsay-line p-7 transition-all duration-300 hover:-translate-y-1 hover:border-kawsay-olive/50 hover:shadow-soft dark:border-kawsay-nightLine dark:bg-kawsay-nightCard dark:hover:border-kawsay-moss/50 sm:p-8 ${tint}`}>
            <span className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 dark:bg-kawsay-night/60 dark:text-kawsay-moss ${iconCls}`}>
                <Icon className="h-5 w-5" />
            </span>
            <h3 className="mb-3 font-display text-xl font-semibold text-kawsay-forest dark:text-kawsay-nightText sm:text-2xl">
                {title}
            </h3>
            <div className="space-y-3 text-[15px] leading-relaxed text-kawsay-bark dark:text-kawsay-nightMuted">
                {children}
            </div>
        </div>
    </Reveal>
);

export default function Nosotros() {
    return (
        <section id="nosotros" className="scroll-mt-20 bg-kawsay-sage/70 py-20 transition-colors duration-300 dark:bg-kawsay-nightSoft/60 sm:py-28">
            <div className="mx-auto max-w-6xl px-5 sm:px-8">
                <Reveal>
                    <SectionTag>Nosotros</SectionTag>
                </Reveal>
                <Reveal delay={0.08}>
                    <h2 className="mt-5 max-w-2xl font-display text-3xl font-semibold leading-tight text-kawsay-forest dark:text-kawsay-nightText sm:text-4xl lg:text-5xl">
                        Un proyecto que crece desde el aula
                    </h2>
                </Reveal>

                <div className="mt-12 grid gap-6 md:grid-cols-2">
                    <Card icon={HeartHandshake} title="¿Quiénes somos?" delay={0.05} tint="bg-[#FBF5E9]" iconCls="bg-kawsay-brown/10 text-kawsay-brown">
                        <p>
                            Somos estudiantes del Alfonso Ugarte que participamos en una
                            iniciativa basada en el trabajo colaborativo y la integración
                            de diferentes disciplinas mediante el enfoque STEAM + H.
                        </p>
                    </Card>

                    <Card icon={FlaskConical} title="¿Qué es STEAM + H?" delay={0.12} tint="bg-[#F1F6E3]" iconCls="bg-kawsay-olive/15 text-kawsay-olive">
                        <p>Es un enfoque que integra seis disciplinas:</p>
                        <div className="grid grid-cols-2 gap-2.5 pt-1">
                            {DISCIPLINAS.map((d, i) => (
                                <motion.div
                                    key={d.letra}
                                    initial={{ opacity: 0, y: 14 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.45, delay: 0.15 + i * 0.06 }}
                                    className={`flex items-center gap-2.5 rounded-2xl border bg-white/80 px-3 py-2.5 dark:bg-kawsay-night/60 ${d.borde}`}
                                >
                                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold text-kawsay-ivory ${d.circle}`}>
                                        {d.letra}
                                    </span>
                                    <span className="text-sm font-bold text-kawsay-forest dark:text-kawsay-nightText">
                                        {d.nombre}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </Card>

                    <Card icon={Leaf} title="STEAM + H en Kawsay" delay={0.08} tint="bg-[#ECF3DA]" iconCls="bg-kawsay-leaf/15 text-kawsay-leaf">
                        <p>
                            En Kawsay, el enfoque se aplica mediante la participación de
                            los estudiantes en diferentes actividades relacionadas con el
                            desarrollo del proyecto, permitiendo aportar conocimientos y
                            habilidades desde distintas disciplinas.
                        </p>
                    </Card>

                    <Card icon={Package} title="Nuestro producto" delay={0.15} tint="bg-[#F9F1E2]" iconCls="bg-kawsay-brown/10 text-kawsay-brown">
                        <p>
                            Actualmente elaboramos bolsas de tocuyo reutilizables con
                            diseños desarrollados con apoyo de herramientas de
                            inteligencia artificial.
                        </p>
                        <p>
                            El tocuyo fue elegido por ser reutilizable y representar una
                            alternativa frente al uso de bolsas plásticas.
                        </p>
                    </Card>
                </div>

                <div className="mt-14 space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Reveal delay={0.05}>
                            <div
                                data-testid="card-peru"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(90deg, rgba(196,59,47,0.14) 0%, rgba(196,59,47,0.14) 17%, rgba(196,59,47,0.03) 17%, rgba(196,59,47,0.03) 83%, rgba(196,59,47,0.14) 83%)",
                                }}
                                className="group h-full rounded-[1.75rem] border-2 border-kawsay-peru/40 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-kawsay-peru/60 hover:shadow-soft dark:border-kawsay-peru/45 dark:bg-[#2B211D] sm:p-7"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <span className="inline-flex items-center gap-2 rounded-full bg-kawsay-peru/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-kawsay-peru dark:bg-kawsay-peru/20 dark:text-[#E89B93]">
                                        <span className="h-1.5 w-1.5 rounded-full bg-kawsay-peru dark:bg-[#E89B93]" />
                                        Edición especial
                                    </span>
                                    <span
                                        aria-hidden
                                        className="inline-flex h-4 w-7 shrink-0 overflow-hidden rounded-sm border border-kawsay-peru/30 dark:border-[#E89B93]/40"
                                    >
                                        <span className="w-[30%] bg-kawsay-peru" />
                                        <span className="w-[40%] bg-white dark:bg-kawsay-nightText" />
                                        <span className="w-[30%] bg-kawsay-peru" />
                                    </span>
                                </div>
                                <h3 className="mt-4 font-display text-xl font-semibold text-kawsay-peru dark:text-[#E89B93] sm:text-2xl">
                                    PERÚ
                                </h3>
                                <p className="mt-2 max-w-md text-[15px] leading-relaxed text-kawsay-bark dark:text-kawsay-nightMuted">
                                    Tarjeta preparada con una paleta inspirada en los
                                    colores nacionales. La información específica se
                                    agregará próximamente.
                                </p>
                            </div>
                        </Reveal>
                        <Reveal delay={0.12}>
                            <div
                                data-testid="card-alfonso-ugarte"
                                style={{
                                    backgroundImage:
                                        "radial-gradient(circle at 12% 18%, rgba(232,184,0,0.17), transparent 42%), radial-gradient(circle at 88% 88%, rgba(123,18,48,0.15), transparent 48%)",
                                }}
                                className="group h-full rounded-[1.75rem] border-2 border-kawsay-guinda/40 bg-white p-6 ring-1 ring-kawsay-gold/70 transition-all duration-300 hover:-translate-y-1 hover:border-kawsay-guinda/60 hover:shadow-soft dark:border-kawsay-guinda/55 dark:bg-[#292019] dark:ring-kawsay-gold/40 sm:p-7"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <span className="inline-flex items-center rounded-full bg-kawsay-guinda px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                                        Edición institucional
                                    </span>
                                    <img
                                        src="/au-logo.png"
                                        alt="Logo de la escuela emblemática Alfonso Ugarte"
                                        className="h-11 w-11 shrink-0 object-contain"
                                    />
                                </div>
                                <div className="mt-4 flex items-center gap-3">
                                    <h3 className="font-display text-xl font-semibold text-kawsay-guinda dark:text-[#E9A8BC] sm:text-2xl">
                                        ALFONSO UGARTE
                                    </h3>
                                    <span
                                        aria-hidden
                                        className="inline-flex h-4 w-7 shrink-0 overflow-hidden rounded-sm border border-kawsay-guinda/30 dark:border-kawsay-gold/40"
                                    >
                                        <span className="w-1/2 bg-kawsay-guinda/90" />
                                        <span className="w-1/2 bg-kawsay-gold" />
                                    </span>
                                </div>
                                <p className="mt-2 max-w-md text-[15px] leading-relaxed text-kawsay-bark dark:text-kawsay-nightMuted">
                                    Tarjeta con los colores institucionales guinda y
                                    amarillo. La información específica se agregará
                                    próximamente.
                                </p>
                            </div>
                        </Reveal>
                    </div>

                    <Reveal delay={0.15}>
                        <div
                            data-testid="card-profesora"
                            style={{
                                backgroundImage:
                                    "radial-gradient(circle at 88% 10%, rgba(122,81,56,0.08), transparent 45%)",
                            }}
                            className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 overflow-hidden rounded-[1.75rem] border border-kawsay-brown/30 bg-kawsay-sage/35 p-6 text-center shadow-soft dark:border-kawsay-brown/45 dark:bg-kawsay-nightCard sm:flex-row sm:p-7 sm:text-left"
                        >
                            <PlaceholderImage
                                label="Fotografía de la docente"
                                sub="Por agregar"
                                aspect="aspect-square"
                                rounded="rounded-[1.5rem]"
                                className="w-36 shrink-0 sm:w-40"
                                testid="profesora-photo-placeholder"
                            />
                            <div>
                                <span className="inline-flex items-center gap-2 rounded-full bg-kawsay-brown/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-kawsay-brown dark:bg-kawsay-brown/25 dark:text-[#C9A27C]">
                                    <Leaf className="h-3 w-3" />
                                    Reconocimiento
                                </span>
                                <h3 className="mt-3 font-display text-xl font-semibold text-kawsay-brown dark:text-[#C9A27C] sm:text-2xl">
                                    Profesora que inspira
                                </h3>
                                <p className="mt-1 font-display text-base font-semibold text-kawsay-forest dark:text-kawsay-nightText">
                                    Mirian Patricia Vega Cruz
                                </p>
                                <p className="mt-2 text-[15px] leading-relaxed text-kawsay-bark dark:text-kawsay-nightMuted">
                                    Docente que acompaña y orienta el desarrollo de esta
                                    iniciativa, impulsando la participación, creatividad
                                    y aprendizaje de los estudiantes.
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
