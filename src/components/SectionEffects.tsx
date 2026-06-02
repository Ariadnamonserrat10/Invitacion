"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

const COLORS = ["#D4AF37", "#E3F0FA", "#C3E0F4", "#FFFFFF", "#F0D68A"];

export function ConfettiBurst({ trigger }: { trigger: boolean }) {
  const done = useRef(false);

  useEffect(() => {
    if (!trigger || done.current) return;
    done.current = true;
    const defaults = { colors: COLORS, spread: 60, ticks: 80, startVelocity: 25 };
    confetti({ ...defaults, particleCount: 40, origin: { x: 0.2, y: 0.4 } });
    confetti({ ...defaults, particleCount: 40, origin: { x: 0.8, y: 0.4 } });
    setTimeout(() => {
      confetti({ ...defaults, particleCount: 20, origin: { x: 0.5, y: 0.3 }, spread: 100 });
    }, 300);
  }, [trigger]);

  return null;
}

export function Bubbles({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = () => canvas.width;
    const h = () => canvas.height;

    const resize = () => { canvas.width = canvas.parentElement?.clientWidth || window.innerWidth; canvas.height = canvas.parentElement?.clientHeight || window.innerHeight; };
    resize();

    interface Bubble { x: number; y: number; r: number; vx: number; vy: number; alpha: number; pulse: number; }
    const bubbles: Bubble[] = Array.from({ length: 12 }, () => ({
      x: Math.random() * w(), y: Math.random() * h(),
      r: 2 + Math.random() * 5, vx: (Math.random() - 0.5) * 0.2,
      vy: -(0.2 + Math.random() * 0.4), alpha: 0.08 + Math.random() * 0.12,
      pulse: Math.random() * Math.PI * 2,
    }));

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, w(), h());
      bubbles.forEach(b => {
        b.x += b.vx + Math.sin(Date.now() * 0.001 + b.pulse) * 0.1;
        b.y += b.vy;
        b.pulse += 0.01;
        if (b.y < -10) { b.y = h() + 10; b.x = Math.random() * w(); }

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${b.alpha * (0.6 + Math.sin(b.pulse) * 0.3)})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(b.x - b.r * 0.25, b.y - b.r * 0.25, b.r * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${b.alpha * 0.3})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, [active]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[2]" />;
}

export function SparkleTrail({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = canvas.parentElement?.clientWidth || window.innerWidth; canvas.height = canvas.parentElement?.clientHeight || window.innerHeight; };
    resize();

    interface Spark { x: number; y: number; vx: number; vy: number; size: number; life: number; maxLife: number; color: string; }
    const sparks: Spark[] = [];

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 0.15 && sparks.length < 20) {
        sparks.push({
          x: Math.random() * canvas.width, y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5 - 0.3,
          size: 1 + Math.random() * 2.5, life: 0, maxLife: 80 + Math.random() * 60,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life++;
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.005;
        const alpha = 1 - s.life / s.maxLife;
        if (alpha <= 0) { sparks.splice(i, 1); continue; }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * alpha, 0, Math.PI * 2);
        ctx.fillStyle = s.color + Math.floor(alpha * 180).toString(16).padStart(2, "0");
        ctx.fill();
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * alpha * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = s.color + Math.floor(alpha * 40).toString(16).padStart(2, "0");
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    };
    animate();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, [active]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[2]" />;
}

export function Butterflies({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = canvas.parentElement?.clientWidth || window.innerWidth; canvas.height = canvas.parentElement?.clientHeight || window.innerHeight; };
    resize();

    interface Bfly { x: number; y: number; vx: number; vy: number; size: number; hue: number; wing: number; phase: number; }
    const bfs: Bfly[] = Array.from({ length: 4 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height * 0.7,
      vx: (Math.random() - 0.5) * 0.4, vy: -(0.1 + Math.random() * 0.15),
      size: 4 + Math.random() * 4, hue: 200 + Math.random() * 30,
      wing: 0, phase: Math.random() * Math.PI * 2,
    }));

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bfs.forEach(b => {
        b.x += b.vx + Math.sin(Date.now() * 0.002 + b.phase) * 0.15;
        b.y += b.vy;
        b.wing = Math.sin(Date.now() * 0.008 + b.phase) * 0.5 + 0.3;

        if (b.y < -20) { b.y = canvas.height + 10; b.x = Math.random() * canvas.width; }

        const s = b.size;
        const w = b.wing;
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.globalAlpha = 0.25;

        ctx.fillStyle = `hsla(${b.hue}, 40%, 75%, 0.3)`;
        ctx.beginPath();
        ctx.ellipse(0, -s * 0.2, Math.abs(s * 0.7 * w), s * 0.5, -0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(0, s * 0.2, Math.abs(s * 0.5 * w), s * 0.4, 0.3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `hsla(${b.hue + 20}, 30%, 85%, 0.2)`;
        ctx.beginPath();
        ctx.ellipse(-s * 0.2, -s * 0.3, Math.abs(s * 0.35 * w), s * 0.25, -0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(-s * 0.2, s * 0.3, Math.abs(s * 0.3 * w), s * 0.2, 0.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `hsla(${b.hue}, 60%, 90%, 0.35)`;
        ctx.beginPath();
        ctx.ellipse(s * 0.15, 0, s * 0.12, s * 0.06, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      animId = requestAnimationFrame(animate);
    };
    animate();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, [active]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[2]" />;
}
