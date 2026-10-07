import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { Reveal, SectionTag, EASE } from "./Reveal";

const TOTAL_PAGINAS = 9;

export default function Catalogo() {
    const [pagina, setPagina] = useState(1);
    const [dir, setDir] = useState(1);
    const [touchX, setTouchX] = useState(null);

    const ir = (delta) => {
        setPagina((p) => {
            const next = Math.min(TOTAL_PAGINAS, Math.max(1, p + delta));
            if (next !== p) setDir(delta);
            return next;
        });
    };

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "ArrowLeft") ir(-1);
            if (e.key === "ArrowRight") ir(1);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    const onTouchStart = (e) => setTouchX(e.touches[0].clientX);
    const onTouchEnd = (e) => {
        if (touchX === null) return;
        const delta = touchX - e.changedTouches[0].clientX;
        if (delta > 45) ir(1);
        else if (delta < -45) ir(-1);
        setTouchX(null);
    };

    const flechaCls =
        "absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-kawsay-pine text-kawsay-ivory shadow-lift transition-all duration-300 hover:scale-105 hover:bg-kawsay-forest disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:scale-100 dark:bg-kawsay-olive dark:hover:bg-kawsay-leaf sm:h-12 sm:w-12";

    return (
        <section
            id="catalogo"
            className="scroll-mt-20 bg-kawsay-sage/70 py-20 transition-colors duration-300 dark:bg-kawsay-nightSoft/60 sm:py-28"
        >
            <div className="mx-auto max-w-6xl px-5 sm:px-8">
                <Reveal>
                    <SectionTag>Catálogo</SectionTag>
                </Reveal>
                <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
                    <Reveal delay={0.08}>
                        <h2 className="max-w-xl font-display text-3xl font-semibold leading-tight text-kawsay-forest dark:text-kawsay-nightText sm:text-4xl lg:text-5xl">
                            Bolsas de tocuyo reutilizables
                        </h2>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <a
                            href="/catalogo.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid="catalog-pdf-link"
                            className="inline-flex items-center gap-2 rounded-full border-2 border-kawsay-olive/50 bg-kawsay-ivory px-5 py-2.5 font-display text-sm font-semibold text-kawsay-pine transition-all duration-300 hover:-translate-y-0.5 hover:border-kawsay-olive hover:bg-kawsay-sage/40 dark:border-kawsay-moss/60 dark:bg-transparent dark:text-kawsay-nightText dark:hover:bg-kawsay-nightCard/70"
                        >
                            <FileText className="h-4 w-4" />
                            Ver PDF completo
                        </a>
                    </Reveal>
                </div>
                <Reveal delay={0.2}>
                    <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-kawsay-bark dark:text-kawsay-nightMuted">
                        Recorre nuestro catálogo de diseños página por página, como una
                        revista, usando las flechas de los lados.
                    </p>
                </Reveal>

                <Reveal delay={0.25} className="mt-12">
                    <div
                        className="relative mx-auto max-w-sm select-none sm:max-w-md"
                        onTouchStart={onTouchStart}
                        onTouchEnd={onTouchEnd}
                    >
                        <button
                            data-testid="catalog-prev-page"
                            onClick={() => ir(-1)}
                            disabled={pagina === 1}
                            aria-label="Página anterior"
                            className={`${flechaCls} -left-3 sm:-left-16`}
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>

                        <div className="overflow-hidden rounded-[1.75rem] border-2 border-kawsay-olive/40 bg-white shadow-lift dark:border-kawsay-moss/45">
                            <AnimatePresence mode="wait" initial={false} custom={dir}>
                                <motion.img
                                    key={pagina}
                                    src={`/catalogo/pagina-${pagina}.jpg`}
                                    alt={`Catálogo de Kawsay, página ${pagina} de ${TOTAL_PAGINAS}`}
                                    data-testid="catalog-page-image"
                                    draggable={false}
                                    initial={{ opacity: 0, x: 42 * dir }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -42 * dir }}
                                    transition={{ duration: 0.28, ease: EASE }}
                                    className="w-full"
                                />
                            </AnimatePresence>
                        </div>

                        <button
                            data-testid="catalog-next-page"
                            onClick={() => ir(1)}
                            disabled={pagina === TOTAL_PAGINAS}
                            aria-label="Página siguiente"
                            className={`${flechaCls} -right-3 sm:-right-16`}
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="mt-6 flex flex-col items-center gap-3">
                        <p
                            data-testid="catalog-page-indicator"
                            className="font-display text-sm font-semibold text-kawsay-pine dark:text-kawsay-moss"
                        >
                            Página {pagina} de {TOTAL_PAGINAS}
                        </p>
                        <div className="flex items-center gap-2">
                            {Array.from({ length: TOTAL_PAGINAS }, (_, i) => (
                                <button
                                    key={i + 1}
                                    data-testid={`catalog-dot-${i + 1}`}
                                    onClick={() => {
                                        setDir(i + 1 > pagina ? 1 : -1);
                                        setPagina(i + 1);
                                    }}
                                    aria-label={`Ir a la página ${i + 1}`}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        pagina === i + 1
                                            ? "w-6 bg-kawsay-olive dark:bg-kawsay-moss"
                                            : "w-2 bg-kawsay-line hover:bg-kawsay-moss/60 dark:bg-kawsay-nightLine dark:hover:bg-kawsay-moss/60"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
