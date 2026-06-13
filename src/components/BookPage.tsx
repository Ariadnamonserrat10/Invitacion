"use client";

import { useRef, ReactNode, useCallback } from "react";
import { motion, useInView } from "framer-motion";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function BookPage({ children, id, className = "" }: { children: ReactNode; id?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-100px" });

  const goNext = useCallback(() => {
    if (!id) return;
    const ids = ["countdown", "welcome", "invitation", "parents", "timeline", "location", "thanks"];
    const idx = ids.indexOf(id);
    if (idx < ids.length - 1) scrollToId(ids[idx + 1]);
  }, [id]);

  const goPrev = useCallback(() => {
    if (!id) return;
    const ids = ["countdown", "welcome", "invitation", "parents", "timeline", "location", "thanks"];
    const idx = ids.indexOf(id);
    if (idx > 0) scrollToId(ids[idx - 1]);
  }, [id]);

  const isFirst = id === "countdown";
  const isLast = id === "thanks";

  return (
    <motion.div
      ref={ref}
      id={id}
      initial={{ opacity: 0, rotateY: -8, x: 60, scale: 0.95 }}
      animate={inView ? { opacity: 1, rotateY: 0, x: 0, scale: 1 } : {}}
      transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative w-full max-w-5xl mx-auto my-8 md:my-12 ${className}`}
      style={{ perspective: "1200px" }}
    >
      <div
        className="relative w-full rounded-[2vmin] overflow-hidden"
        style={{
          background: "linear-gradient(177deg, #FCFAF5 0%, #F5F0E8 40%, #F0EBE0 100%)",
          boxShadow: [
            "0 2px 4px rgba(0,0,0,0.02)",
            "0 8px 24px rgba(0,0,0,0.04)",
            "0 20px 60px rgba(0,0,0,0.06)",
            "0 1px 0 rgba(52,93,137,0.06) inset",
          ].join(","),
          border: "1px solid rgba(52,93,137,0.08)",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none rounded-[2vmin]"
          style={{
            background: [
              "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 10%, transparent 90%, rgba(52,93,137,0.02) 100%)",
              "repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(195,224,244,0.04) 28px, rgba(195,224,244,0.04) 29px)",
            ].join(","),
          }}
        />

        <div
          className="absolute right-0 top-0 bottom-0 w-[3px] pointer-events-none"
          style={{
            background: "linear-gradient(180deg, rgba(52,93,137,0.06), rgba(195,224,244,0.04), rgba(52,93,137,0.06))",
            boxShadow: "-1px 0 2px rgba(0,0,0,0.02)",
          }}
        />

        <div className="relative z-10 p-6 md:p-10 lg:p-14">
          {children}
        </div>

        <div
          className="absolute bottom-0 left-[5%] right-[5%] h-[3px] pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(52,93,137,0.04), rgba(195,224,244,0.06), rgba(52,93,137,0.04), transparent)",
          }}
        />

        <div className="flex items-center justify-between px-6 md:px-10 lg:px-14 pb-5">
          <button
            onClick={goPrev}
            disabled={isFirst}
            className="flex items-center gap-2 text-xs tracking-wider uppercase font-[var(--font-cinzel)] transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none"
            style={{ color: "rgba(58,90,122,0.4)" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(52,93,137,0.7)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(58,90,122,0.4)"; }}
          >
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="hidden sm:inline">Anterior</span>
          </button>

          <span className="text-[9px] tracking-[0.3em] uppercase font-[var(--font-cinzel)]" style={{ color: "rgba(58,90,122,0.2)" }}>
            {id ? id.charAt(0).toUpperCase() + id.slice(1) : ""}
          </span>

          <button
            onClick={goNext}
            disabled={isLast}
            className="flex items-center gap-2 text-xs tracking-wider uppercase font-[var(--font-cinzel)] transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none"
            style={{ color: "rgba(58,90,122,0.4)" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(52,93,137,0.7)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(58,90,122,0.4)"; }}
          >
            <span className="hidden sm:inline">Siguiente</span>
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <path d="M8 4l6 6-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {inView && (
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="hidden md:block absolute -left-8 top-[15%] bottom-[15%] w-[6px] pointer-events-none"
          style={{
            background: "linear-gradient(180deg, transparent, rgba(200,190,170,0.15), rgba(200,190,170,0.25), rgba(200,190,170,0.15), transparent)",
            borderRadius: "3px",
            boxShadow: "2px 0 4px rgba(0,0,0,0.02)",
          }}
        />
      )}
    </motion.div>
  );
}
