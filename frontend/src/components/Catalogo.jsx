import { Reveal, SectionTag } from "./Reveal";
import PlaceholderImage from "./PlaceholderImage";

const DISENOS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));

export default function Catalogo() {
    return (
        <section id="catalogo" className="scroll-mt-20 bg-kawsay-sage/70 py-20 transition-colors duration-300 dark:bg-kawsay-nightSoft/60 sm:py-28">
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
                        <div className="rounded-2xl border border-kawsay-line bg-white px-5 py-3 dark:border-kawsay-nightLine dark:bg-kawsay-nightCard">
                            <p className="font-display text-lg font-semibold text-kawsay-forest dark:text-kawsay-nightText">
                                S/ 10.00
                                <span className="ml-2 align-middle text-xs font-bold uppercase tracking-wider text-kawsay-bark/60 dark:text-kawsay-nightMuted">
                                    precio provisional
                                </span>
                            </p>
                        </div>
                    </Reveal>
                </div>
                <Reveal delay={0.2}>
                    <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-kawsay-bark dark:text-kawsay-nightMuted">
                        Planeamos alrededor de 12 diseños inspirados en la identidad
                        peruana y en mensajes de crecimiento personal. Los nombres,
                        descripciones y fotografías de cada diseño se agregarán
                        próximamente.
                    </p>
                </Reveal>

                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {DISENOS.map((n, i) => (
                        <Reveal key={n} delay={(i % 4) * 0.07} className="h-full">
                            <article
                                data-testid={`catalog-item-${i + 1}`}
                                className="group flex h-full flex-col rounded-[1.75rem] border border-kawsay-line bg-white p-4 transition-all duration-300 hover:-translate-y-1.5 hover:border-kawsay-olive/50 hover:shadow-soft dark:border-kawsay-nightLine dark:bg-kawsay-nightCard dark:hover:border-kawsay-moss/60"
                            >
                                <div className="relative">
                                    <PlaceholderImage
                                        label={`Fotografía del diseño ${n}`}
                                        sub="Por agregar"
                                        aspect="aspect-square"
                                        rounded="rounded-[1.25rem]"
                                        testid={`catalog-image-${i + 1}`}
                                    />
                                    <span className="absolute left-3 top-3 rounded-full bg-kawsay-forest/85 px-3 py-1 font-display text-xs font-semibold text-kawsay-ivory dark:bg-kawsay-night/85 dark:text-kawsay-nightText">
                                        {n}
                                    </span>
                                </div>
                                <h3 className="mt-4 px-1 font-display text-lg font-semibold text-kawsay-forest dark:text-kawsay-nightText">
                                    Diseño {n}
                                </h3>
                                <p className="mt-1 flex-1 px-1 text-sm leading-relaxed text-kawsay-bark/80 dark:text-kawsay-nightMuted">
                                    Nombre del diseño, su significado y breve descripción
                                    por definir.
                                </p>
                                <div className="mt-4 flex items-center justify-between border-t border-kawsay-line/70 px-1 pt-3 dark:border-kawsay-nightLine/70">
                                    <span className="font-display text-base font-semibold text-kawsay-brown dark:text-kawsay-ocre">
                                        S/ 10.00
                                    </span>
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-kawsay-bark/50 dark:text-kawsay-nightMuted">
                                        provisional
                                    </span>
                                </div>
                            </article>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
