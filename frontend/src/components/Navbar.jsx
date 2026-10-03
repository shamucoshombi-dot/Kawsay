import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { scrollToId } from "../utils/scroll";

const SECTIONS = [
    { id: "inicio", label: "Inicio" },
    { id: "nosotros", label: "Nosotros" },
    { id: "galeria", label: "Galería" },
    { id: "catalogo", label: "Catálogo" },
    { id: "contactanos", label: "Contáctanos" },
];

const ThemeToggle = ({ dark, onToggle, testid, className = "" }) => (
    <button
        data-testid={testid}
        onClick={onToggle}
        aria-label={dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        aria-pressed={dark}
        className={`flex h-11 w-11 items-center justify-center rounded-full border border-kawsay-line bg-white/80 text-kawsay-pine transition-all duration-300 hover:border-kawsay-olive dark:border-kawsay-nightLine dark:bg-kawsay-nightCard dark:text-kawsay-ocre ${className}`}
    >
        <motion.span
            key={dark ? "moon" : "sun"}
            initial={{ rotate: -40, opacity: 0, scale: 0.7 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex"
        >
            {dark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </motion.span>
    </button>
);

export default function Navbar({ dark, onToggleTheme }) {
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState("inicio");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 8);
            const pos = window.scrollY + 150;
            let current = "inicio";
            for (const s of SECTIONS) {
                const el = document.getElementById(s.id);
                if (el && el.offsetTop <= pos) current = s.id;
            }
            setActive(current);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const go = (id) => {
        setOpen(false);
        scrollToId(id);
    };

    return (
        <header
            className={`fixed inset-x-0 top-0 z-40 bg-kawsay-ivory/90 backdrop-blur-md transition-colors duration-300 dark:bg-kawsay-night/90 ${
                scrolled || open ? "shadow-soft" : ""
            } border-b border-kawsay-line/60 dark:border-kawsay-nightLine/70`}
        >
            <nav className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 sm:px-8">
                <button
                    data-testid="navbar-logo"
                    onClick={() => go("inicio")}
                    className="flex items-center gap-1"
                    aria-label="Ir al inicio"
                >
                    <img
                        src="/kawsay-logo.png"
                        alt="Logo de Kawsay"
                        className="h-14 w-auto transition-all duration-300 dark:rounded-2xl dark:bg-kawsay-ivory/95 dark:p-1.5"
                    />
                </button>

                <div className="hidden items-center gap-2 md:flex">
                    <ul className="flex items-center gap-1">
                        {SECTIONS.map((s) => (
                            <li key={s.id}>
                                <button
                                    data-testid={`nav-link-${s.id}`}
                                    onClick={() => go(s.id)}
                                    className={`relative rounded-full px-4 py-2 text-sm font-bold transition-colors duration-200 ${
                                        active === s.id
                                            ? "text-kawsay-forest dark:text-kawsay-nightText"
                                            : "text-kawsay-bark hover:text-kawsay-forest dark:text-kawsay-nightMuted dark:hover:text-kawsay-nightText"
                                    }`}
                                >
                                    {s.label}
                                    {active === s.id && (
                                        <motion.span
                                            layoutId="nav-pill"
                                            className="absolute inset-0 -z-10 rounded-full bg-kawsay-sand/70 dark:bg-kawsay-nightCard"
                                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                        />
                                    )}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <ThemeToggle
                        dark={dark}
                        onToggle={onToggleTheme}
                        testid="theme-toggle-button"
                    />
                </div>

                <div className="flex items-center gap-2 md:hidden">
                    <ThemeToggle
                        dark={dark}
                        onToggle={onToggleTheme}
                        testid="theme-toggle-mobile"
                    />
                    <button
                        data-testid="mobile-menu-button"
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-kawsay-line bg-white/80 text-kawsay-forest dark:border-kawsay-nightLine dark:bg-kawsay-nightCard dark:text-kawsay-nightText"
                        onClick={() => setOpen((v) => !v)}
                        aria-label="Abrir menú"
                        aria-expanded={open}
                    >
                        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.25 }}
                        className="border-t border-kawsay-line/60 bg-kawsay-ivory/95 px-5 pb-6 pt-2 backdrop-blur-md dark:border-kawsay-nightLine/70 dark:bg-kawsay-night/95 md:hidden"
                    >
                        <ul className="flex flex-col">
                            {SECTIONS.map((s) => (
                                <li key={s.id}>
                                    <button
                                        data-testid={`mobile-link-${s.id}`}
                                        onClick={() => go(s.id)}
                                        className={`w-full rounded-2xl px-4 py-3 text-left font-bold transition-colors ${
                                            active === s.id
                                                ? "bg-kawsay-sand/60 text-kawsay-forest dark:bg-kawsay-nightCard dark:text-kawsay-nightText"
                                                : "text-kawsay-bark dark:text-kawsay-nightMuted"
                                        }`}
                                    >
                                        {s.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
