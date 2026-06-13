"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const [phase, setPhase] = useState<"loading" | "done">("loading");

  useEffect(() => {
    const timer = setTimeout(() => setPhase("done"), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase === "done") {
      setTimeout(() => onFinish(), 1200);
    }
  }, [phase, onFinish]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: "#FFFFFF" }}
        >
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse at 50% 30%, rgba(227,240,250,0.5) 0%, transparent 60%), radial-gradient(ellipse at 50% 70%, rgba(52,93,137,0.08) 0%, transparent 50%)",
          }} />

          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div key={`ls-${i}`}
                className="absolute"
                style={{
                  left: `${5 + ((i * 19) % 90)}%`, top: `${5 + ((i * 37) % 90)}%`,
                  width: 2 + (i % 3), height: 2 + (i % 3),
                  background: i % 4 === 0 ? "#345D89" : "#E3F0FA",
                  borderRadius: i % 3 === 0 ? "50%" : i % 3 === 1 ? "2px" : "0",
                  transform: i % 3 === 2 ? "rotate(45deg)" : "none",
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 0.8, 0], scale: [0, 1.5, 0], rotate: [0, 180] }}
                transition={{ duration: 3 + (i % 2), delay: i * 0.15, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1, rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 1.5, ease: "easeOut", rotate: { duration: 3, repeat: Infinity } }}
            className="relative z-10 text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.08, 1], filter: ["drop-shadow(0 0 10px rgba(52,93,137,0.3))", "drop-shadow(0 0 40px rgba(52,93,137,0.5))", "drop-shadow(0 0 10px rgba(52,93,137,0.3))"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="mb-8"
            >
              <svg width="90" height="90" viewBox="0 0 100 90" className="mx-auto">
                <path d="M50 5 L62 30 L90 33 L68 52 L74 82 L50 68 L26 82 L32 52 L10 33 L38 30 Z"
                  fill="none" stroke="#345D89" strokeWidth="2.5" strokeLinejoin="round" opacity={0.9} />
                <path d="M50 5 L62 30 L90 33 L68 52 L74 82 L50 68 L26 82 L32 52 L10 33 L38 30 Z"
                  fill="#345D89" opacity={0.15} />
                <circle cx="50" cy="50" r="6" fill="#345D89" opacity={0.3} />
                <path d="M50 18 Q55 25 62 28" stroke="#345D89" strokeWidth="1" fill="none" opacity={0.4} />
                <path d="M50 18 Q45 25 38 28" stroke="#345D89" strokeWidth="1" fill="none" opacity={0.4} />
              </svg>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-[var(--font-great-vibes)] mb-4" style={{ color: "#1E3A5F" }}>
              Mis XV Años
            </h2>

            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center justify-center gap-2 mt-4"
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#345D89" }} />
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#E3F0FA" }} />
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#345D89" }} />
            </motion.div>

            <motion.p
              animate={{ opacity: [0.4, 0.8, 0.4], y: [0, -3, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="text-[10px] tracking-[0.35em] uppercase font-[var(--font-cinzel)] mt-6"
              style={{ color: "rgba(58,90,122,0.5)" }}
            >
              Tejiendo magia...
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
