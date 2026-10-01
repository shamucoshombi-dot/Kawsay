import { HandHeart } from "lucide-react";
import { Reveal, SectionTag } from "./Reveal";
import PlaceholderImage from "./PlaceholderImage";

const DISENOS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));

export default function Catalogo({ onInterest }) {
    return (
        <section id="catalogo" className="scroll-mt-20 bg-kawsay-cream/60 py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-5 sm:px-8">
                <Reveal>
                    <SectionTag>Catálogo</SectionTag>
                </Reveal>
                <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
                    <Reveal delay={0.08}>
                        <h2 className="max-w-xl font-display text-3xl font-semibold leading-tight text-kawsay-forest sm:text-4xl lg:text-5xl">
                            Bolsas de tocuyo reutilizables
                        </h2>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <div className="rounded-2xl border border-kawsay-line bg-white px-5 py-3">
                            <p className="font-display text-lg font-semibold text-kawsay-forest">
                                S/ 10.00
                                <span className="ml-2 align-middle text-xs font-bold uppercase tracking-wider text-kawsay-bark/60">
                                    precio provisional
                                </span>
                            </p>
                        </div>
                    </Reveal>
                </div>
                <Reveal delay={0.2}>
                    <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-kawsay-bark">
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
                                className="group flex h-full flex-col rounded-[1.75rem] border border-kawsay-line bg-white p-4 transition-all duration-300 hover:-translate-y-1.5 hover:border-kawsay-olive/50 hover:shadow-soft"
                            >
                                <div className="relative">
                                    <PlaceholderImage
                                        label={`Fotografía del diseño ${n}`}
                                        sub="Por agregar"
                                        aspect="aspect-square"
                                        rounded="rounded-[1.25rem]"
                                        testid={`catalog-image-${i + 1}`}
                                    />
                                    <span className="absolute left-3 top-3 rounded-full bg-kawsay-forest/85 px-3 py-1 font-display text-xs font-semibold text-kawsay-ivory">
                                        {n}
                                    </span>
                                </div>
                                <h3 className="mt-4 px-1 font-display text-lg font-semibold text-kawsay-forest">
                                    Diseño {n}
                                </h3>
                                <p className="mt-1 flex-1 px-1 text-sm leading-relaxed text-kawsay-bark/80">
                                    Nombre del diseño, su significado y breve descripción
                                    por definir.
                                </p>
                                <div className="mt-4 flex items-center justify-between px-1">
                                    <span className="font-display text-base font-semibold text-kawsay-brown">
                                        S/ 10.00
                                    </span>
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-kawsay-bark/50">
                                        provisional
                                    </span>
                                </div>
                                <button
                                    data-testid={`catalog-interest-${i + 1}`}
                                    onClick={() => onInterest(`Diseño ${n}`)}
                                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-kawsay-ivory px-4 py-2.5 font-display text-sm font-semibold text-kawsay-forest ring-1 ring-inset ring-kawsay-line transition-all duration-300 hover:bg-kawsay-olive hover:text-kawsay-ivory hover:ring-kawsay-olive"
                                >
                                    <HandHeart className="h-4 w-4" />
                                    Me interesa
                                </button>
                            </article>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
