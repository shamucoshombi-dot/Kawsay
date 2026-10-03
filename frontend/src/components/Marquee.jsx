import { Sprout } from "lucide-react";

const WORDS = ["Creando", "Aprendiendo", "Transformando", "Juntos"];

const Row = ({ hidden }) => (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
        {WORDS.map((w) => (
            <span key={w} className="flex items-center">
                <span className="px-5 font-display text-lg font-medium sm:px-8 sm:text-2xl">
                    {w}
                </span>
                <Sprout className="h-4 w-4 shrink-0 text-kawsay-moss/60 sm:h-5 sm:w-5" />
            </span>
        ))}
    </div>
);

export default function Marquee() {
    return (
        <div className="relative z-10 overflow-hidden py-4">
            <div className="-mx-6 -rotate-1 border-y border-kawsay-pine/30 bg-kawsay-pine py-2.5 text-kawsay-ivory/95 sm:py-3">
                <div className="flex w-max animate-marquee">
                    <Row />
                    <Row hidden />
                </div>
            </div>
        </div>
    );
}
