import { Sprout } from "lucide-react";

const WORDS = ["Creando", "Aprendiendo", "Transformando", "Juntos"];

const Row = ({ hidden }) => (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
        {WORDS.map((w) => (
            <span key={w} className="flex items-center">
                <span className="px-6 font-display text-2xl font-medium sm:px-10 sm:text-4xl">
                    {w}
                </span>
                <Sprout className="h-6 w-6 shrink-0 text-kawsay-moss/70 sm:h-8 sm:w-8" />
            </span>
        ))}
    </div>
);

export default function Marquee() {
    return (
        <div className="relative z-10 overflow-hidden py-5">
            <div className="-mx-6 -rotate-1 border-y border-kawsay-pine/40 bg-kawsay-forest py-4 text-kawsay-ivory sm:py-5">
                <div className="flex w-max animate-marquee">
                    <Row />
                    <Row hidden />
                </div>
            </div>
        </div>
    );
}
