import { motion } from "framer-motion";
import { Sprout } from "lucide-react";

export const EASE = [0.22, 1, 0.36, 1];

export const Reveal = ({ children, delay = 0, y = 28, className = "", ...rest }) => (
    <motion.div
        className={className}
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, delay, ease: EASE }}
        {...rest}
    >
        {children}
    </motion.div>
);

export const SectionTag = ({ children }) => (
    <span className="inline-flex items-center gap-2 rounded-full border border-kawsay-line bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-kawsay-leaf dark:border-kawsay-nightLine dark:bg-kawsay-nightCard/80 dark:text-kawsay-moss">
        <Sprout className="h-3.5 w-3.5" />
        {children}
    </span>
);
