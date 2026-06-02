"use client";

import { useEffect, useRef } from "react";

interface Cloud {
  x: number; y: number; scale: number; opacity: number;
  speed: number; width: number; height: number;
}

export default function FloatingClouds() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cloudsRef = useRef<Cloud[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createCloud = (w: number, h: number): Cloud => ({
      x: Math.random() * w,
      y: 30 + Math.random() * (h * 0.5),
      scale: 0.5 + Math.random() * 1.5,
      opacity: 0.04 + Math.random() * 0.06,
      speed: 0.15 + Math.random() * 0.25,
      width: 120 + Math.random() * 200,
      height: 40 + Math.random() * 60,
    });

    const drawCloud = (c: Cloud) => {
      ctx.save();
      ctx.globalAlpha = c.opacity;
      ctx.translate(c.x, c.y);
      ctx.scale(c.scale, c.scale);

      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.shadowColor = "rgba(227, 240, 250, 0.3)";
      ctx.shadowBlur = 30;

      const cx = 0;
      const cy = 0;
      const w = c.width;
      const h = c.height;

      ctx.beginPath();
      ctx.ellipse(cx, cy, w * 0.3, h * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(cx - w * 0.2, cy + h * 0.1, w * 0.25, h * 0.4, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(cx + w * 0.25, cy + h * 0.05, w * 0.2, h * 0.35, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(cx - w * 0.1, cy - h * 0.15, w * 0.22, h * 0.3, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(cx + w * 0.15, cy - h * 0.1, w * 0.18, h * 0.25, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(cx + w * 0.35, cy + h * 0.15, w * 0.15, h * 0.25, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const init = () => {
      resize();
      const w = canvas.width;
      const h = canvas.height;
      cloudsRef.current = Array.from({ length: 8 }, () => createCloud(w, h));
    };

    const animate = () => {
      if (!canvas) return;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      cloudsRef.current.forEach((c, i) => {
        c.x += c.speed;
        if (c.x > w + 200) {
          cloudsRef.current[i] = createCloud(w, h);
          cloudsRef.current[i].x = -300;
        }
        drawCloud(c);
      });

      animId = requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}
