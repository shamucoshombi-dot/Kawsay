import { motion } from "framer-motion";
import { FlaskConical, HeartHandshake, Leaf, Package } from "lucide-react";
import { Reveal, SectionTag } from "./Reveal";

const DISCIPLINAS = [
    { letra: "S", nombre: "Ciencia" },
    { letra: "T", nombre: "Tecnología" },
    { letra: "E", nombre: "Ingeniería" },
    { letra: "A", nombre: "Arte" },
    { letra: "M", nombre: "Matemática" },
    { letra: "H", nombre: "Humanidades" },
];

const Card = ({ icon: Icon, title, children, delay = 0 }) => (
    <Reveal delay={delay} className="h-full">
        <div className="group h-full rounded-[2rem] border border-kawsay-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-kawsay-olive/50 hover:shadow-soft sm:p-8">
            <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-kawsay-leaf/10 text-kawsay-leaf transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-5 w-5" />
            </span>
            <h3 className="mb-3 font-display text-xl font-semibold text-kawsay-forest sm:text-2xl">
                {title}
            </h3>
            <div className="space-y-3 text-[15px] leading-relaxed text-kawsay-bark">
                {children}
            </div>
        </div>
    </Reveal>
);

export default function Nosotros() {
    return (
        <section id="nosotros" className="scroll-mt-20 bg-kawsay-cream/60 py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-5 sm:px-8">
                <Reveal>
                    <SectionTag>Nosotros</SectionTag>
                </Reveal>
                <Reveal delay={0.08}>
                    <h2 className="mt-5 max-w-2xl font-display text-3xl font-semibold leading-tight text-kawsay-forest sm:text-4xl lg:text-5xl">
                        Un proyecto que crece desde el aula
                    </h2>
                </Reveal>

                <div className="mt-12 grid gap-6 md:grid-cols-2">
                    <Card icon={HeartHandshake} title="¿Quiénes somos?" delay={0.05}>
                        <p>
                            Somos estudiantes del Alfonso Ugarte que participamos en una
                            iniciativa basada en el trabajo colaborativo y la integración
                            de diferentes disciplinas mediante el enfoque STEAM + H.
                        </p>
                    </Card>

                    <Card icon={FlaskConical} title="¿Qué es STEAM + H?" delay={0.12}>
                        <p>Es un enfoque que integra seis disciplinas:</p>
                        <div className="grid grid-cols-2 gap-2.5 pt-1">
                            {DISCIPLINAS.map((d, i) => (
                                <motion.div
                                    key={d.letra}
                                    initial={{ opacity: 0, y: 14 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.45, delay: 0.15 + i * 0.06 }}
                                    className="flex items-center gap-2.5 rounded-2xl border border-kawsay-line bg-kawsay-ivory px-3 py-2.5"
                                >
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-kawsay-olive font-display text-sm font-semibold text-kawsay-ivory">
                                        {d.letra}
                                    </span>
                                    <span className="text-sm font-bold text-kawsay-forest">
                                        {d.nombre}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </Card>

                    <Card icon={Leaf} title="STEAM + H en Kawsay" delay={0.08}>
                        <p>
                            En Kawsay, el enfoque se aplica mediante la participación de
                            los estudiantes en diferentes actividades relacionadas con el
                            desarrollo del proyecto, permitiendo aportar conocimientos y
                            habilidades desde distintas disciplinas.
                        </p>
                    </Card>

                    <Card icon={Package} title="Nuestro producto" delay={0.15}>
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

                <div className="mt-14 grid gap-6 md:grid-cols-2">
                    <Reveal delay={0.05}>
                        <div
                            data-testid="card-peru"
                            className="group h-full rounded-[2rem] border-2 border-kawsay-peru/25 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-kawsay-peru/50 hover:shadow-soft"
                        >
                            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-kawsay-peru/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-kawsay-peru">
                                <span className="h-2 w-2 rounded-full bg-kawsay-peru" />
                                Edición especial
                            </span>
                            <h3 className="font-display text-2xl font-semibold text-kawsay-peru sm:text-3xl">
                                PERÚ
                            </h3>
                            <p className="mt-3 text-[15px] leading-relaxed text-kawsay-bark">
                                Tarjeta preparada con una paleta inspirada en los colores
                                nacionales. La información específica se agregará
                                próximamente.
                            </p>
                        </div>
                    </Reveal>
                    <Reveal delay={0.12}>
                        <div
                            data-testid="card-alfonso-ugarte"
                            className="group h-full rounded-[2rem] border-2 border-kawsay-guinda/25 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-kawsay-guinda/50 hover:shadow-soft"
                        >
                            <div className="mb-5 flex items-center gap-4">
                                <img
                                    src="/au-logo.png"
                                    alt="Logo de la escuela emblemática Alfonso Ugarte"
                                    className="h-14 w-14 object-contain"
                                />
                                <span className="inline-flex items-center rounded-full bg-kawsay-guinda px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white">
                                    Edición institucional
                                </span>
                            </div>
                            <h3 className="font-display text-2xl font-semibold text-kawsay-guinda sm:text-3xl">
                                ALFONSO UGARTE
                            </h3>
                            <p className="mt-3 text-[15px] leading-relaxed text-kawsay-bark">
                                Tarjeta con los colores institucionales guinda y amarillo.
                                La información específica se agregará próximamente.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
