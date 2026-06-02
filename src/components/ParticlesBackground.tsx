"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number; vx: number; vy: number;
  size: number; opacity: number; life: number; maxLife: number;
  type: "star" | "circle" | "petal";
}

export default function ParticlesBackground({ count = 40 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };

    const create = (): Particle => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3 - 0.1,
      size: Math.random() * 2.5 + 0.8, opacity: Math.random() * 0.3 + 0.1,
      life: 0, maxLife: 300 + Math.random() * 400,
      type: (["star", "circle", "petal"] as const)[Math.floor(Math.random() * 3)],
    });

    const init = () => { resize(); particles = Array.from({ length: count }, create); };

    const drawStar = (x: number, y: number, s: number) => {
      const spikes = 4; const outer = s; const inner = s * 0.4;
      let rot = (Math.PI / 2) * 3; const step = Math.PI / spikes;
      ctx.beginPath(); ctx.moveTo(x, y - outer);
      for (let i = 0; i < spikes; i++) {
        ctx.lineTo(x + Math.cos(rot) * outer, y + Math.sin(rot) * outer); rot += step;
        ctx.lineTo(x + Math.cos(rot) * inner, y + Math.sin(rot) * inner); rot += step;
      }
      ctx.closePath();
    };

    const drawPetal = (x: number, y: number, s: number) => {
      ctx.beginPath();
      ctx.ellipse(x, y, s * 1.5, s * 0.6, Math.PI / 4, 0, Math.PI * 2);
      ctx.closePath();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy; p.life++;
        p.opacity = Math.sin((p.life / p.maxLife) * Math.PI) * 0.25 + 0.08;
        if (p.life > p.maxLife || p.x < -20 || p.x > canvas.width + 20 || p.y < -20 || p.y > canvas.height + 20) {
          particles[i] = create(); return;
        }
        ctx.save();
        ctx.fillStyle = `rgba(227, 240, 250, ${p.opacity})`;
        ctx.strokeStyle = `rgba(195, 224, 244, ${p.opacity * 0.5})`;
        ctx.lineWidth = 0.5;

        if (p.type === "star") { drawStar(p.x, p.y, p.size); ctx.fill(); ctx.stroke(); }
        else if (p.type === "petal") { drawPetal(p.x, p.y, p.size); ctx.fill(); ctx.stroke(); }
        else { ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill(); }

        ctx.restore();
      });
      animId = requestAnimationFrame(animate);
    };

    init(); animate();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, [count]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}
