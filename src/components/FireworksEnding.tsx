"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number; y: number; vx: number; vy: number;
  size: number; color: string; life: number; maxLife: number;
  trail: { x: number; y: number }[];
}

export default function FireworksEnding() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let animId: number;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#E3F0FA", "#C3E0F4", "#FFFFFF", "#E3F0FA", "#C3E0F4"];

    const createExplosion = (cx: number, cy: number) => {
      const count = 40 + Math.floor(Math.random() * 30);
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
        const speed = 1.5 + Math.random() * 3;
        particles.push({
          x: cx, y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.5,
          size: 1.5 + Math.random() * 2.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 0,
          maxLife: 80 + Math.random() * 60,
          trail: [],
        });
      }
    };

    let lastExplosion = 0;

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create new explosions periodically
      if (time - lastExplosion > 1200 + Math.random() * 1500) {
        const x = canvas.width * (0.15 + Math.random() * 0.7);
        const y = canvas.height * (0.15 + Math.random() * 0.5);
        createExplosion(x, y);
        // Sometimes double burst
        if (Math.random() > 0.6) {
          setTimeout(() => createExplosion(
            canvas.width * (0.2 + Math.random() * 0.6),
            canvas.height * (0.2 + Math.random() * 0.4)
          ), 200);
        }
        lastExplosion = time;
      }

      particles = particles.filter(p => p.life < p.maxLife);

      particles.forEach(p => {
        p.life++;
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 8) p.trail.shift();

        p.vx *= 0.97;
        p.vy *= 0.97;
        p.vy += 0.02;
        p.x += p.vx;
        p.y += p.vy;

        const opacity = 1 - p.life / p.maxLife;
        const alpha = Math.max(0, opacity);

        // Draw trail
        for (let i = 0; i < p.trail.length; i++) {
          const t = i / p.trail.length;
          ctx.beginPath();
          ctx.arc(p.trail[i].x, p.trail[i].y, p.size * t * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = p.color.replace(")", `,${alpha * t * 0.4})`).replace("rgb", "rgba");
          ctx.fill();
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (0.5 + opacity * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(alpha * 200).toString(16).padStart(2, "0");
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(alpha * 40).toString(16).padStart(2, "0");
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative min-h-[60vh] flex flex-col items-center justify-center overflow-hidden" style={{ background: "#FFFFFF" }}>
      {/* Gradient background */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, rgba(227,240,250,0.15) 0%, transparent 30%, transparent 70%, rgba(227,240,250,0.1) 100%)",
      }} />

      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

      <div className="relative z-20 text-center max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-80px" }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        >
          <p className="text-xs md:text-sm tracking-[0.4em] uppercase font-[var(--font-cinzel)] mb-6" style={{ color: "#3A5A7A" }}>
            Y así comienza
          </p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ margin: "-80px" }}
          transition={{ duration: 1.5, delay: 0.6 }}
          className="h-px w-24 mx-auto mb-8"
          style={{ background: "linear-gradient(90deg, transparent, rgba(195,224,244,0.5), transparent)" }}
        />

        <motion.h2
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ margin: "-80px" }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          className="text-3xl md:text-5xl lg:text-6xl font-[var(--font-great-vibes)] mb-4"
          style={{ color: "#1E3A5F", textShadow: "0 0 40px rgba(227,240,250,0.4)" }}
        >
          Que este sea el inicio
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-80px" }}
          transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
          className="text-lg md:text-2xl font-[var(--font-allura)]"
          style={{ color: "#3A5A7A", textShadow: "0 0 20px rgba(227,240,250,0.3)" }}
        >
          de un cuento de hadas
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ margin: "-80px" }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="h-px w-16 mx-auto mt-8"
          style={{ background: "linear-gradient(90deg, transparent, rgba(227,240,250,0.3), transparent)" }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ margin: "-80px" }}
          transition={{ duration: 1.5, delay: 1.8 }}
          className="mt-8 text-xs tracking-[0.3em] uppercase font-[var(--font-poppins)]"
          style={{ color: "rgba(58,90,122,0.4)" }}
        >
          ✦ Suri Michelle ✦
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-20" />
    </section>
  );
}
