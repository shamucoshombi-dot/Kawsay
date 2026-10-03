import { Sprout } from "lucide-react";

export default function PlaceholderImage({
    label = "Imagen próximamente",
    sub,
    aspect = "aspect-[4/3]",
    rounded = "rounded-[2rem]",
    className = "",
    testid,
    variant = "soft",
}) {
    const frameCls =
        variant === "frame"
            ? "border-2 border-kawsay-olive/45 bg-kawsay-sage/45"
            : "border border-kawsay-olive/25 bg-[#F3F6E9]";
    return (
        <div
            data-testid={testid}
            className={`texture-weave group/ph relative overflow-hidden ${frameCls} ${rounded} ${aspect} ${className}`}
        >
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-kawsay-sand/60" />
            <div className="absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-kawsay-moss/25" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-kawsay-olive/15 text-kawsay-olive transition-transform duration-500 group-hover/ph:scale-110">
                    <Sprout className="h-5 w-5" />
                </span>
                <p className="text-sm font-bold text-kawsay-forest">{label}</p>
                {sub ? (
                    <p className="text-xs font-semibold text-kawsay-bark/70">{sub}</p>
                ) : null}
            </div>
        </div>
    );
}
