import { Leaf, QrCode } from "lucide-react";
import { Reveal, SectionTag } from "./Reveal";
import PlaceholderImage from "./PlaceholderImage";

const BLOQUES = [
    {
        num: "01",
        title: "Planificación y organización",
        disciplina: "Matemática y Ciencias",
        texto: "Se analizaron medidas, materiales y aspectos necesarios para planificar cómo se desarrollarían las bolsas, buscando que el proyecto fuera práctico y funcional.",
        fotos: [
            { src: "/etapa-1-b.jpg", alt: "Estudiantes analizando materiales y medidas en grupo" },
            { src: "/etapa-1-a.jpg", alt: "Estudiantes planificando el proyecto Kawsay en conjunto" },
        ],
    },
    {
        num: "02",
        title: "Creatividad y diseño",
        disciplina: "Participación de todas las disciplinas",
        texto: "Cada disciplina aportó propuestas e ideas para crear diseños originales, combinando creatividad, conocimientos y diferentes perspectivas.",
        fotos: [
            { src: "/etapa-2-b.jpg", alt: "Estudiantes creando juntos los diseños del proyecto" },
            { src: "/etapa-2-a.jpg", alt: "Diseño creativo elaborado por los estudiantes" },
        ],
    },
    {
        num: "03",
        title: "Elaboración y construcción",
        disciplina: "Humanidades e Ingeniería",
        texto: "Se llevaron a cabo las actividades prácticas del proyecto, aplicando lo planificado y desarrollando elementos relacionados con la elaboración y presentación de las bolsas.",
        fotos: [
            { src: "/etapa-3-a.jpg", alt: "Estudiantes elaborando las bolsas de tocuyo en el aula" },
            { src: "/etapa-3-b.jpg", alt: "Detalle de manos trabajando el tocuyo de las bolsas" },
        ],
    },
    {
        num: "04",
        title: "Detalles y promoción",
        disciplina: "Tecnología y Arte",
        texto: "Se realizaron los últimos acabados para mejorar la presentación del producto y se creó material visual destinado a darlo a conocer y promoverlo.",
    },
];

export default function Galeria() {
    return (
        <section
            id="galeria"
            className="relative scroll-mt-20 overflow-hidden bg-kawsay-creamWarm/60 py-20 transition-colors duration-300 dark:bg-[#282F1E] sm:py-28"
        >
            <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="absolute -left-28 top-24 h-64 w-64 rounded-full bg-kawsay-sand/50 blur-2xl dark:opacity-25" />
                <Leaf className="absolute right-[7%] top-28 h-9 w-9 rotate-12 text-kawsay-moss/40 dark:text-kawsay-moss/30" />
            </div>
            <div className="mx-auto max-w-6xl px-5 sm:px-8">
                <Reveal>
                    <SectionTag>Galería</SectionTag>
                </Reveal>
                <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
                    <Reveal delay={0.08}>
                        <h2 className="max-w-xl font-display text-3xl font-semibold leading-tight text-kawsay-forest dark:text-kawsay-nightText sm:text-4xl lg:text-5xl">
                            El proceso, paso a paso
                        </h2>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <p className="max-w-sm text-[15px] leading-relaxed text-kawsay-bark dark:text-kawsay-nightMuted">
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
                                        <span className="font-display text-5xl font-semibold text-kawsay-olive/60 dark:text-kawsay-moss/50 sm:text-6xl">
                                            {b.num}
                                        </span>
                                        <h3 className="mt-3 font-display text-2xl font-semibold leading-tight text-kawsay-forest dark:text-kawsay-nightText sm:text-3xl">
                                            {b.title}
                                        </h3>
                                        <p className="mt-2.5 inline-flex rounded-full bg-kawsay-olive/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-kawsay-olive dark:bg-kawsay-olive/20 dark:text-kawsay-moss">
                                            {b.disciplina}
                                        </p>
                                        <div className="mt-4 rounded-2xl border-l-4 border-kawsay-olive/50 bg-white/70 p-4 dark:border-kawsay-moss/60 dark:bg-kawsay-nightCard/70">
                                            <p className="text-[15px] leading-relaxed text-kawsay-bark dark:text-kawsay-nightMuted">
                                                {b.texto}
                                            </p>
                                        </div>
                                    </div>
                                </Reveal>
                                <Reveal delay={0.1} className="md:w-[58%]">
                                    <div className="grid grid-cols-5 gap-4">
                                        <div className="col-span-3">
                                            {b.fotos ? (
                                                <div className="organic-frame relative aspect-[4/3] overflow-hidden border-2 border-kawsay-olive/40 shadow-soft dark:border-kawsay-moss/40">
                                                    <img
                                                        src={b.fotos[0].src}
                                                        alt={b.fotos[0].alt}
                                                        data-testid={`gallery-photo-${i + 1}-a`}
                                                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                                                    />
                                                </div>
                                            ) : (
                                                <PlaceholderImage
                                                    label={`Fotografía 1 · ${b.title}`}
                                                    sub="Por agregar"
                                                    aspect="aspect-[4/3]"
                                                    variant="frame"
                                                    testid={`gallery-photo-${i + 1}-a`}
                                                />
                                            )}
                                        </div>
                                        <div className={`col-span-2 ${reversed ? "-mt-6" : "mt-6"}`}>
                                            {b.fotos ? (
                                                <div className="relative aspect-square overflow-hidden rounded-[1.5rem] border-2 border-kawsay-olive/40 shadow-soft dark:border-kawsay-moss/40">
                                                    <img
                                                        src={b.fotos[1].src}
                                                        alt={b.fotos[1].alt}
                                                        data-testid={`gallery-photo-${i + 1}-b`}
                                                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                                                    />
                                                </div>
                                            ) : (
                                                <PlaceholderImage
                                                    label={`Fotografía 2`}
                                                    sub="Por agregar"
                                                    aspect="aspect-square"
                                                    rounded="rounded-[1.5rem]"
                                                    variant="frame"
                                                    testid={`gallery-photo-${i + 1}-b`}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </Reveal>
                            </div>
                        );
                    })}
                </div>

                <Reveal delay={0.1}>
                    <div className="mt-20 flex flex-col items-center text-center sm:mt-24">
                        <div className="relative rounded-[1.75rem] border-2 border-kawsay-olive/40 bg-white p-4 shadow-lift dark:border-kawsay-moss/45">
                            <span className="absolute -left-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full bg-kawsay-olive text-kawsay-ivory shadow-soft">
                                <QrCode className="h-4 w-4" />
                            </span>
                            <img
                                src="/kawsay-qr.png"
                                alt="Código QR del proyecto Kawsay"
                                data-testid="gallery-qr-code"
                                className="h-44 w-44 sm:h-52 sm:w-52"
                            />
                        </div>
                        <p
                            data-testid="gallery-qr-text"
                            className="mt-6 max-w-sm font-display text-lg font-semibold leading-snug text-kawsay-forest dark:text-kawsay-nightText sm:text-xl"
                        >
                            ¿Quieres ver más sobre nuestro proceso? ¡Escanea el código QR!
                        </p>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
