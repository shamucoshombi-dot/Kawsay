import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Leaf, Sprout } from "lucide-react";
import { scrollToId } from "../utils/scroll";
import PlaceholderImage from "./PlaceholderImage";
import { EASE } from "./Reveal";

const lineReveal = {
    hidden: { y: "115%" },
    show: (i) => ({
        y: "0%",
        transition: { duration: 0.9, delay: 0.15 + i * 0.13, ease: EASE },
    }),
};

export default function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const yImg = useTransform(scrollYProgress, [0, 1], [0, 70]);
    const yDecor = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <section
            id="inicio"
            ref={ref}
            className="relative scroll-mt-20 overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-36"
        >
            <motion.div
                style={{ y: yDecor }}
                aria-hidden
                className="pointer-events-none absolute inset-0"
            >
                <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-kawsay-sand/60 blur-2xl" />
                <div className="absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-kawsay-moss/25 blur-2xl" />
                <Leaf className="absolute left-[6%] top-[16%] h-10 w-10 -rotate-12 text-kawsay-moss/50" />
                <Leaf className="absolute bottom-[12%] right-[8%] h-14 w-14 rotate-12 text-kawsay-leaf/30" />
            </motion.div>

            <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-6">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: EASE }}
                        className="mb-7 inline-flex items-center gap-2 rounded-full border border-kawsay-line bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-kawsay-leaf"
                    >
                        <Sprout className="h-3.5 w-3.5" />
                        Proyecto estudiantil · STEAM + H
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
                            className="group inline-flex items-center gap-2 rounded-full bg-kawsay-olive px-7 py-3.5 font-display text-base font-semibold text-kawsay-ivory shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-kawsay-pine hover:shadow-lift"
                        >
                            Conoce nuestro proyecto
                            <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                        </button>
                        <button
                            data-testid="hero-secondary-link"
                            onClick={() => scrollToId("catalogo")}
                            className="inline-flex items-center gap-2 rounded-full border border-kawsay-line bg-white/70 px-6 py-3 font-display text-base font-semibold text-kawsay-forest transition-all duration-300 hover:-translate-y-0.5 hover:border-kawsay-olive"
                        >
                            Ver catálogo
                        </button>
                    </motion.div>
                </div>

                <motion.div
                    style={{ y: yImg }}
                    className="relative lg:col-span-6"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.35, ease: EASE }}
                >
                    <div
                        aria-hidden
                        className="absolute -right-6 -top-8 h-40 w-40 animate-float-slow rounded-[2.5rem] bg-kawsay-brown/15"
                    />
                    <PlaceholderImage
                        testid="hero-image-placeholder"
                        label="Imagen principal del proyecto"
                        sub="Fotografía por agregar próximamente"
                        aspect="aspect-[4/3] sm:aspect-[5/4]"
                        rounded="organic-frame"
                        className="shadow-lift"
                    />
                    <div className="absolute -bottom-6 left-4 flex animate-float items-center gap-3 rounded-2xl border border-kawsay-line bg-white/95 px-5 py-3.5 shadow-soft sm:left-8">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-kawsay-leaf/10 text-kawsay-leaf">
                            <Sprout className="h-4 w-4" />
                        </span>
                        <div>
                            <p className="font-display text-sm font-semibold text-kawsay-forest">
                                Bolsas de tocuyo reutilizables
                            </p>
                            <p className="text-xs font-semibold text-kawsay-bark/70">
                                Diseño con identidad peruana
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
