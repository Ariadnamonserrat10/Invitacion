"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import fondoDash from "@/img/fondo_dash.jpg";

const GOLD = "#FFC107";
const GOLD_RGB = "255, 193, 7";

export default function DashboardIntro({ onStart }: { onStart: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    interface Dot { x: number; y: number; vx: number; vy: number; r: number; alpha: number; phase: number; }
    const dots: Dot[] = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2,
      r: 1.5 + Math.random() * 2.5, alpha: 0.25 + Math.random() * 0.35,
      phase: Math.random() * Math.PI * 2,
    }));

    interface Ring { cx: number; cy: number; r: number; alpha: number; speed: number; phase: number; }
    const rings: Ring[] = Array.from({ length: 5 }, (_, i) => ({
      cx: canvas.width * (0.15 + Math.random() * 0.7),
      cy: canvas.height * (0.15 + Math.random() * 0.7),
      r: 60 + Math.random() * 150, alpha: 0.06 + Math.random() * 0.06,
      speed: 0.15 + Math.random() * 0.3, phase: Math.random() * Math.PI * 2,
    }));

    let animId: number;
    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      rings.forEach(r => {
        const pulse = 0.5 + Math.sin(time * 0.001 * r.speed + r.phase) * 0.5;
        ctx.beginPath();
        ctx.arc(r.cx, r.cy, r.r + pulse * 30, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${GOLD_RGB}, ${r.alpha * (0.4 + pulse * 0.6)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      dots.forEach(d => {
        d.x += d.vx + Math.sin(time * 0.0005 + d.phase) * 0.08;
        d.y += d.vy + Math.cos(time * 0.0006 + d.phase) * 0.08;
        if (d.x < -20) d.x = canvas.width + 20;
        if (d.x > canvas.width + 20) d.x = -20;
        if (d.y < -20) d.y = canvas.height + 20;
        if (d.y > canvas.height + 20) d.y = -20;
      });

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            const a = (1 - dist / 150) * 0.2;
            ctx.strokeStyle = `rgba(${GOLD_RGB}, ${a})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      dots.forEach(d => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        const flicker = 0.4 + Math.sin(time * 0.003 + d.phase) * 0.3;
        ctx.fillStyle = `rgba(${GOLD_RGB}, ${d.alpha * flicker})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${GOLD_RGB}, ${d.alpha * flicker * 0.15})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden cursor-pointer bg-cover bg-center"
      onClick={onStart}
      style={{ backgroundImage: `url(${fondoDash.src})` }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Overlay oscuro para contraste */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.15) 80%, rgba(0,0,0,0.25) 100%)" }} />

      <div className="relative z-10 flex flex-col items-center gap-12">
        {/* Botón central */}
        <motion.div
          className="relative w-44 h-44 md:w-56 md:h-56 rounded-full flex flex-col items-center justify-center pointer-events-none"
          style={{
            background: [
              "radial-gradient(circle at 40% 35%, rgba(255,255,255,0.15) 0%, rgba(255,193,7,0.06) 30%, rgba(255,193,7,0.01) 70%, transparent 100%)",
            ].join(""),
            boxShadow: [
              "0 0 60px rgba(255,193,7,0.08)",
              "0 0 120px rgba(255,193,7,0.04)",
              "inset 0 0 40px rgba(255,193,7,0.03)",
            ].join(","),
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.2 }}
        >
          {/* Anillo exterior giratorio */}
          <motion.div
            className="absolute inset-[-12px] rounded-full"
            style={{
              border: "2px solid rgba(255,193,7,0.12)",
              background: "radial-gradient(circle, rgba(255,193,7,0.04) 0%, transparent 70%)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />

          {/* Anillo interior */}
          <motion.div
            className="absolute inset-[-6px] rounded-full"
            style={{ border: "1.5px solid rgba(255,193,7,0.08)" }}
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />

          {/* Pulso de brillo */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(255,193,7,0.08) 0%, transparent 60%)" }}
            animate={{
              boxShadow: [
                "0 0 30px rgba(255,193,7,0.06), 0 0 60px rgba(255,193,7,0.03)",
                "0 0 60px rgba(255,193,7,0.15), 0 0 120px rgba(255,193,7,0.08)",
                "0 0 30px rgba(255,193,7,0.06), 0 0 60px rgba(255,193,7,0.03)",
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Texto del botón */}
          <span className="relative z-10 text-xs md:text-sm tracking-[0.4em] uppercase font-[var(--font-cinzel)]"
            style={{ color: "rgba(255,193,7,0.6)" }}>
            Toca para
          </span>
          <motion.span
            className="relative z-10 text-base md:text-lg tracking-[0.3em] uppercase font-[var(--font-cinzel)] font-bold mt-1"
            style={{ color: GOLD, textShadow: "0 0 30px rgba(255,193,7,0.3), 0 0 60px rgba(255,193,7,0.1)" }}
            animate={{ opacity: [0.6, 1, 0.6], textShadow: ["0 0 20px rgba(255,193,7,0.2)", "0 0 50px rgba(255,193,7,0.4), 0 0 80px rgba(255,193,7,0.2)", "0 0 20px rgba(255,193,7,0.2)"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            empezar
          </motion.span>

          {/* Flecha */}
          <motion.svg
            width="18" height="18" viewBox="0 0 20 20" fill="none"
            className="relative z-10 mt-3"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M10 3v14M5 12l5 5 5-5" stroke="rgba(255,193,7,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </motion.div>

        {/* Etiqueta decorativa */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        >
          <div className="h-px w-16" style={{ background: "linear-gradient(90deg, transparent, rgba(255,193,7,0.15), transparent)" }} />
          <span className="text-[9px] tracking-[0.4em] uppercase font-[var(--font-cinzel)]" style={{ color: "rgba(255,193,7,0.3)" }}>
            Suri Michelle
          </span>
          <div className="h-px w-16" style={{ background: "linear-gradient(90deg, transparent, rgba(255,193,7,0.15), transparent)" }} />
        </motion.div>
      </div>
    </motion.div>
  );
}
