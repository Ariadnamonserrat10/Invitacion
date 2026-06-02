"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number; y: number; vx: number; vy: number;
  size: number; opacity: number; life: number; maxLife: number;
  type: "sparkle" | "fairy" | "petal" | "dust" | "butterfly";
  rot: number; rotV: number;
  hue: number; glow: number;
}

interface Butterfly {
  x: number; y: number; vx: number; vy: number;
  size: number; phase: number; opacity: number;
  wingAngle: number; wingSpeed: number;
}

interface ParticleEffectsProps {
  count?: number;
  butterflyCount?: number;
  sparkleIntensity?: number;
}

export default function ParticleEffects({
  count = 80,
  butterflyCount = 6,
  sparkleIntensity = 1,
}: ParticleEffectsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const butterfliesRef = useRef<Butterfly[]>([]);
  const particlesRef = useRef<Particle[]>([]);

  const createParticle = useCallback((w: number, h: number): Particle => {
    const types: Particle["type"][] = ["sparkle", "fairy", "dust", "petal"];
    const type = types[Math.floor(Math.random() * types.length)];
    const isBright = Math.random() > 0.5;
    return {
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.8) * 0.3 - 0.2,
      size: Math.random() * 3 + 1, opacity: Math.random() * 0.5 + 0.2,
      life: 0, maxLife: 400 + Math.random() * 600,
      type, rot: Math.random() * Math.PI * 2, rotV: (Math.random() - 0.5) * 0.02,
      hue: isBright ? 210 + Math.random() * 30 : 190 + Math.random() * 40,
      glow: isBright ? 0.6 : 0.2,
    };
  }, []);

  const createButterfly = useCallback((w: number, h: number): Butterfly => ({
    x: Math.random() * w, y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.3 - 0.2,
    size: 6 + Math.random() * 8, phase: Math.random() * Math.PI * 2,
    opacity: Math.random() * 0.4 + 0.3,
    wingAngle: 0, wingSpeed: 0.08 + Math.random() * 0.06,
  }), []);

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

    const init = () => {
      resize();
      const w = canvas.width;
      const h = canvas.height;
      particlesRef.current = Array.from({ length: count }, () => createParticle(w, h));
      butterfliesRef.current = Array.from({ length: butterflyCount }, () => createButterfly(w, h));
    };

    const drawSparkle = (x: number, y: number, s: number, rot: number, hue: number, glow: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.globalAlpha = alpha;

      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 3);
      grad.addColorStop(0, `hsla(${hue}, 80%, 90%, ${glow})`);
      grad.addColorStop(0.3, `hsla(${hue}, 70%, 80%, ${glow * 0.3})`);
      grad.addColorStop(1, `hsla(${hue}, 60%, 70%, 0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, s * 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const outer = s * (0.5 + Math.sin(rot + i) * 0.3);
        ctx.lineTo(Math.cos(angle) * outer, Math.sin(angle) * outer);
        const innerAngle = angle + Math.PI / 4;
        ctx.lineTo(Math.cos(innerAngle) * s * 0.2, Math.sin(innerAngle) * s * 0.2);
      }
      ctx.closePath();
      ctx.fillStyle = `hsla(${hue + 20}, 100%, 95%, ${alpha * 0.8})`;
      ctx.fill();
      ctx.restore();
    };

    const drawFairy = (x: number, y: number, s: number, alpha: number) => {
      ctx.save();
      ctx.globalAlpha = alpha * 0.4;
      ctx.fillStyle = "rgba(227, 240, 250, 0.3)";
      ctx.beginPath();
      ctx.arc(x, y, s * 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = alpha;
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.beginPath();
      ctx.arc(x, y, s * 0.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = alpha * 0.6;
      ctx.fillStyle = "rgba(195, 224, 244, 0.5)";
      ctx.beginPath();
      ctx.arc(x - s, y - s * 0.5, s * 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x + s, y - s * 0.3, s * 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawButterfly = (b: Butterfly) => {
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.globalAlpha = b.opacity;
      ctx.rotate(b.phase);

      const wing = b.wingAngle;
      const s = b.size;

      ctx.fillStyle = `hsla(210, 60%, 75%, ${b.opacity * 0.8})`;
      ctx.strokeStyle = `hsla(200, 50%, 85%, ${b.opacity * 0.4})`;
      ctx.lineWidth = 0.5;

      ctx.beginPath();
      ctx.ellipse(0, -s * 0.1, s * 0.9 * Math.cos(wing), s * 0.6, -0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = `hsla(220, 50%, 80%, ${b.opacity * 0.6})`;
      ctx.beginPath();
      ctx.ellipse(0, s * 0.1, s * 0.7 * Math.sin(wing + 0.5), s * 0.5, 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = `hsla(200, 40%, 85%, ${b.opacity * 0.5})`;
      ctx.beginPath();
      ctx.ellipse(-s * 0.2, -s * 0.3, s * 0.4 * Math.cos(wing * 0.7), s * 0.3, -0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = `hsla(200, 40%, 85%, ${b.opacity * 0.5})`;
      ctx.beginPath();
      ctx.ellipse(-s * 0.2, s * 0.3, s * 0.35 * Math.sin(wing * 0.7), s * 0.25, 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "rgba(227, 240, 250, 0.9)";
      ctx.beginPath();
      ctx.ellipse(s * 0.2, 0, s * 0.15, s * 0.08, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      if (!canvas) return;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const time = Date.now() / 1000;

      butterfliesRef.current.forEach((b, i) => {
        b.x += b.vx;
        b.y += b.vy;
        b.wingAngle = Math.sin(time * b.wingSpeed * 3) * 0.8 + 0.2;
        b.phase += 0.002;
        if (b.x < -50 || b.x > w + 50 || b.y < -50 || b.y > h + 50) {
          butterfliesRef.current[i] = createButterfly(w, h);
          butterfliesRef.current[i].x = Math.random() * w;
          butterfliesRef.current[i].y = Math.random() < 0.5 ? -20 : h + 20;
        }
        drawButterfly(b);
      });

      particlesRef.current.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.rotV;
        p.life++;
        const lifeRatio = p.life / p.maxLife;
        const fadeIn = Math.min(1, lifeRatio * 4);
        const fadeOut = Math.max(0, 1 - lifeRatio * 1.2);
        p.opacity = (Math.sin(lifeRatio * Math.PI) * 0.3 + 0.1) * fadeIn * fadeOut * sparkleIntensity;

        if (p.life > p.maxLife || p.x < -30 || p.x > w + 30 || p.y < -30 || p.y > h + 30) {
          particlesRef.current[i] = createParticle(w, h);
          return;
        }

        if (p.opacity > 0.01) {
          if (p.type === "sparkle") {
            drawSparkle(p.x, p.y, p.size, p.rot, p.hue, p.glow, p.opacity);
          } else if (p.type === "fairy") {
            drawFairy(p.x, p.y, p.size, p.opacity);
          } else if (p.type === "dust") {
            ctx.save();
            ctx.globalAlpha = p.opacity * 0.5;
            ctx.fillStyle = `hsla(${p.hue}, 50%, 85%, ${p.opacity})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          } else {
            ctx.save();
            ctx.globalAlpha = p.opacity * 0.3;
            ctx.fillStyle = `hsla(${p.hue + 30}, 40%, 90%, ${p.opacity * 0.5})`;
            ctx.beginPath();
            ctx.ellipse(p.x, p.y, p.size, p.size * 0.4, p.rot, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }
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
  }, [count, butterflyCount, sparkleIntensity, createParticle, createButterfly]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}
