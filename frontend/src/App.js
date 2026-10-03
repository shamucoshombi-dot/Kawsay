import { Component, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import { Toaster } from "sonner";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Nosotros from "./components/Nosotros";
import Galeria from "./components/Galeria";
import Catalogo from "./components/Catalogo";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer";
import PanelDocente from "./pages/PanelDocente";
import { initTheme, setTheme } from "./utils/theme";
import "./App.css";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }
    static getDerivedStateFromError(error) {
        return { error };
    }
    render() {
        if (this.state.error) {
            return (
                <div className="flex min-h-screen items-center justify-center bg-kawsay-ivory px-6 text-center dark:bg-kawsay-night">
                    <div>
                        <p className="font-display text-2xl font-semibold text-kawsay-forest dark:text-kawsay-nightText">
                            Algo salió mal
                        </p>
                        <p className="mt-2 text-kawsay-bark dark:text-kawsay-nightMuted">
                            Recarga la página para volver a ver el proyecto Kawsay.
                        </p>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

function Page({ dark, onToggleTheme }) {
    useEffect(() => {
        const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
        window.__lenis = lenis;
        let raf;
        const loop = (t) => {
            lenis.raf(t);
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        return () => {
            cancelAnimationFrame(raf);
            lenis.destroy();
            window.__lenis = null;
        };
    }, []);

    return (
        <div className="relative min-h-screen bg-kawsay-ivory font-body text-kawsay-ink dark:bg-kawsay-night dark:text-kawsay-nightText">
            <Navbar dark={dark} onToggleTheme={onToggleTheme} />
            <main>
                <Hero />
                <Marquee />
                <Nosotros />
                <Galeria />
                <Catalogo />
                <Contacto />
            </main>
            <Footer />
            <Toaster position="bottom-right" richColors closeButton theme={dark ? "dark" : "light"} />
        </div>
    );
}

export default function App() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        setDark(initTheme());
    }, []);

    const onToggleTheme = () => {
        const next = !dark;
        setDark(next);
        setTheme(next);
    };

    return (
        <ErrorBoundary>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Page dark={dark} onToggleTheme={onToggleTheme} />} />
                    <Route path="/panel" element={<PanelDocente />} />
                    <Route path="*" element={<Page dark={dark} onToggleTheme={onToggleTheme} />} />
                </Routes>
            </BrowserRouter>
        </ErrorBoundary>
    );
}
