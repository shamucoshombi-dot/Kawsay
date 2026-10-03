const KEY = "kawsay-theme";

export const initTheme = () => {
    try {
        const dark = localStorage.getItem(KEY) === "dark";
        document.documentElement.classList.toggle("dark", dark);
        return dark;
    } catch {
        return false;
    }
};

export const setTheme = (dark) => {
    try {
        localStorage.setItem(KEY, dark ? "dark" : "light");
    } catch {
        // almacenamiento no disponible: solo aplicar la clase
    }
    document.documentElement.classList.toggle("dark", dark);
};
