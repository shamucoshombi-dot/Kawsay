import { Leaf } from "lucide-react";
import { Reveal, SectionTag } from "./Reveal";
import PlaceholderImage from "./PlaceholderImage";

const BLOQUES = [
    { num: "01", title: "Trabajo colaborativo" },
    { num: "02", title: "Creación y diseño" },
    { num: "03", title: "Elaboración" },
    { num: "04", title: "Participación estudiantil" },
];

export default function Galeria() {
    return (
        <section
            id="galeria"
            className="relative scroll-mt-20 overflow-hidden bg-kawsay-creamWarm/60 py-20 sm:py-28"
        >
            <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="absolute -left-28 top-24 h-64 w-64 rounded-full bg-kawsay-sand/50 blur-2xl" />
                <Leaf className="absolute right-[7%] top-28 h-9 w-9 rotate-12 text-kawsay-moss/40" />
            </div>
            <div className="mx-auto max-w-6xl px-5 sm:px-8">
                <Reveal>
                    <SectionTag>Galería</SectionTag>
                </Reveal>
                <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
                    <Reveal delay={0.08}>
                        <h2 className="max-w-xl font-display text-3xl font-semibold leading-tight text-kawsay-forest sm:text-4xl lg:text-5xl">
                            El proceso, paso a paso
                        </h2>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <p className="max-w-sm text-[15px] leading-relaxed text-kawsay-bark">
                            Los espacios están preparados para mostrar las fotografías del
                            proyecto junto con una breve descripción de cada etapa.
                        </p>
                    </Reveal>
                </div>

                <div className="mt-14 space-y-16 sm:space-y-24">
                    {BLOQUES.map((b, i) => {
                        const reversed = i % 2 === 1;
                        return (
                            <div
                                key={b.num}
                                data-testid={`gallery-block-${i + 1}`}
                                className={`flex flex-col gap-8 md:flex-row md:items-center md:gap-12 ${
                                    reversed ? "md:flex-row-reverse" : ""
                                }`}
                            >
                                <Reveal className="md:w-[42%]">
                                    <div>
                                        <span className="font-display text-5xl font-semibold text-kawsay-olive/60 sm:text-6xl">
                                            {b.num}
                                        </span>
                                        <h3 className="mt-3 font-display text-2xl font-semibold text-kawsay-forest sm:text-3xl">
                                            {b.title}
                                        </h3>
                                        <div className="mt-4 rounded-2xl border border-dashed border-kawsay-olive/40 bg-kawsay-sage/30 p-4">
                                            <p className="text-sm font-semibold text-kawsay-bark/70">
                                                Breve descripción de esta etapa — se
                                                agregará próximamente.
                                            </p>
                                        </div>
                                    </div>
                                </Reveal>
                                <Reveal delay={0.1} className="md:w-[58%]">
                                    <div className="grid grid-cols-5 gap-4">
                                        <div className="col-span-3">
                                            <PlaceholderImage
                                                label={`Fotografía 1 · ${b.title}`}
                                                sub="Por agregar"
                                                aspect="aspect-[4/3]"
                                                variant="frame"
                                                testid={`gallery-photo-${i + 1}-a`}
                                            />
                                        </div>
                                        <div className={`col-span-2 ${reversed ? "-mt-6" : "mt-6"}`}>
                                            <PlaceholderImage
                                                label={`Fotografía 2`}
                                                sub="Por agregar"
                                                aspect="aspect-square"
                                                rounded="rounded-[1.5rem]"
                                                variant="frame"
                                                testid={`gallery-photo-${i + 1}-b`}
                                            />
                                        </div>
                                    </div>
                                </Reveal>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
