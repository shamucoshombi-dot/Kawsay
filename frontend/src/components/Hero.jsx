import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Leaf, Sprout } from "lucide-react";
import { scrollToId } from "../utils/scroll";
import { EASE } from "./Reveal";

const lineReveal = {
    hidden: { y: "115%" },
    show: (i) => ({
        y: "0%",
        transition: { duration: 0.9, delay: 0.15 + i * 0.13, ease: EASE },
    }),
};

const Chip = ({ mobile = false }) => (
    <div
        data-testid={mobile ? "hero-chip-mobile" : "hero-chip"}
        className={`flex items-center gap-3 rounded-2xl border border-kawsay-olive/30 bg-kawsay-ivory/95 px-5 py-3.5 shadow-lift backdrop-blur-sm ${
            mobile ? "" : "animate-float"
        }`}
    >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-kawsay-ocre/15 text-kawsay-ocre">
            <Sprout className="h-4 w-4" />
        </span>
        <div>
            <p className="font-display text-sm font-semibold text-kawsay-forest">
                Bolsas de tocuyo reutilizables
            </p>
            <p className="text-xs font-semibold text-kawsay-bark/70">
                Diseños inspirados en nuestra identidad peruana.
            </p>
        </div>
    </div>
);

export default function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const yImg = useTransform(scrollYProgress, [0, 1], [0, 40]);
    const yDecor = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <section
            id="inicio"
            ref={ref}
            className="relative scroll-mt-20 overflow-hidden lg:min-h-[92vh]"
        >
            <div className="absolute inset-y-0 right-0 hidden w-[54%] lg:block">
                <motion.div style={{ y: yImg }} className="h-full w-full">
                    <img
                        src="/kawsay-hero.jpg"
                        alt="Estudiantes decorando bolsas de tocuyo con diseños inspirados en el Perú, proyecto Kawsay"
                        data-testid="hero-image-main"
                        className="h-full w-full scale-105 object-cover"
                    />
                </motion.div>
                <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(to right, #F7F3EA 0%, rgba(247,243,234,0.85) 14%, rgba(247,243,234,0) 48%)",
                    }}
                />
                <div aria-hidden className="absolute inset-0 bg-kawsay-ocre/[0.04]" />
                <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-kawsay-ivory/90 to-transparent"
                />
                <div className="absolute bottom-16 left-12 z-10">
                    <Chip />
                </div>
            </div>

            <motion.div
                style={{ y: yDecor }}
                aria-hidden
                className="pointer-events-none absolute inset-0"
            >
                <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-kawsay-sand/60 blur-2xl" />
                <div className="absolute bottom-[16%] left-[3%] h-28 w-28 rounded-full border-2 border-kawsay-olive/25" />
                <span className="absolute left-[42%] top-[10%] h-3 w-3 rounded-full bg-kawsay-ocre/45" />
                <span className="absolute bottom-[30%] left-[30%] h-2.5 w-2.5 rounded-full bg-kawsay-brown/30" />
                <Leaf className="absolute left-[6%] top-[16%] h-10 w-10 -rotate-12 text-kawsay-moss/55" />
                <svg
                    className="absolute bottom-[7%] left-[30%] h-16 w-44 text-kawsay-olive/35"
                    viewBox="0 0 176 64"
                    fill="none"
                >
                    <path
                        d="M6 58 C 56 12, 118 12, 170 50"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeDasharray="1 9"
                    />
                </svg>
            </motion.div>

            <div className="relative mx-auto flex max-w-6xl items-center px-5 py-28 sm:px-8 sm:py-32 lg:min-h-[92vh] lg:py-40">
                <div className="max-w-xl lg:max-w-lg lg:w-[46%] xl:max-w-xl">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: EASE }}
                        className="mb-7 inline-flex items-center gap-2 rounded-full border border-kawsay-olive/35 bg-kawsay-sage/50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-kawsay-pine"
                    >
                        <Sprout className="h-3.5 w-3.5" />
                        Proyecto estudiantil · STEAM + H
                        <span className="h-1.5 w-1.5 rounded-full bg-kawsay-ocre" />
                    </motion.div>

                    <h1 className="font-display text-6xl font-semibold leading-none text-kawsay-forest sm:text-7xl lg:text-8xl">
                        <span className="block overflow-hidden pb-1">
                            <motion.span
                                variants={lineReveal}
                                initial="hidden"
                                animate="show"
                                custom={0}
                                className="block"
                            >
                                KAWSAY
                            </motion.span>
                        </span>
                    </h1>

                    <p className="mt-4 font-display text-2xl font-medium leading-snug text-kawsay-leaf sm:text-3xl lg:text-4xl">
                        <span className="block overflow-hidden pb-1">
                            <motion.span variants={lineReveal} initial="hidden" animate="show" custom={1} className="block">
                                Creando, aprendiendo
                            </motion.span>
                        </span>
                        <span className="block overflow-hidden pb-2">
                            <motion.span variants={lineReveal} initial="hidden" animate="show" custom={2} className="block">
                                y transformando juntos.
                            </motion.span>
                        </span>
                    </p>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
                        className="mt-7 space-y-4 text-base leading-relaxed text-kawsay-bark sm:text-lg"
                    >
                        <p>
                            Kawsay es una iniciativa desarrollada por alumnos del Alfonso
                            Ugarte mediante el enfoque STEAM + H, que integra diferentes
                            disciplinas para transformar ideas en experiencias y productos
                            concretos.
                        </p>
                        <p>
                            Actualmente estamos desarrollando bolsas de tocuyo
                            reutilizables, acompañadas de diseños inspirados en nuestra
                            identidad peruana y en mensajes relacionados con el crecimiento
                            y desarrollo personal.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
                        className="mt-9 flex flex-wrap items-center gap-4"
                    >
                        <button
                            data-testid="hero-cta-button"
                            onClick={() => scrollToId("nosotros")}
                            className="group inline-flex items-center gap-2 rounded-full bg-kawsay-pine px-7 py-3.5 font-display text-base font-semibold text-kawsay-ivory shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-kawsay-forest hover:shadow-lift"
                        >
                            Conoce nuestro proyecto
                            <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                        </button>
                        <button
                            data-testid="hero-secondary-link"
                            onClick={() => scrollToId("catalogo")}
                            className="inline-flex items-center gap-2 rounded-full border-2 border-kawsay-olive/50 bg-kawsay-ivory px-6 py-3 font-display text-base font-semibold text-kawsay-pine transition-all duration-300 hover:-translate-y-0.5 hover:border-kawsay-olive hover:bg-kawsay-sage/40"
                        >
                            Ver catálogo
                        </button>
                    </motion.div>
                </div>
            </div>

            <div className="relative px-5 pb-16 sm:px-8 lg:hidden">
                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
                    className="relative"
                >
                    <div className="organic-frame relative aspect-[4/3] overflow-hidden border-2 border-kawsay-olive/40 shadow-lift">
                        <img
                            src="/kawsay-hero.jpg"
                            alt="Estudiantes decorando bolsas de tocuyo del proyecto Kawsay"
                            data-testid="hero-image-main-mobile"
                            className="h-full w-full object-cover"
                        />
                        <div aria-hidden className="absolute inset-0 bg-kawsay-ocre/[0.04]" />
                    </div>
                    <div className="absolute -bottom-5 left-4 right-4 sm:left-8 sm:right-auto">
                        <Chip mobile />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
