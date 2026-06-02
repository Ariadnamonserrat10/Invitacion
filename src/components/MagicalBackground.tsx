"use client";

import { useEffect, useRef } from "react";

interface SpiralParticle {
  angle: number; radius: number; speed: number;
  size: number; hue: number; y: number; ySpeed: number; life: number;
}

interface SmokePuff {
  x: number; y: number; vx: number; vy: number;
  size: number; opacity: number; phase: number;
}

interface Confetti {
  x: number; y: number; vx: number; vy: number;
  size: number; rot: number; rotV: number; opacity: number;
}

interface Petal {
  x: number; y: number; vx: number; vy: number;
  size: number; rot: number; rotV: number; opacity: number; phase: number;
}

interface Butterfly {
  x: number; y: number; vx: number; vy: number;
  size: number; phase: number; opacity: number; wingAngle: number; wingSpeed: number; hue: number;
}

interface DustTrail {
  x: number; y: number; vx: number; vy: number;
  life: number; maxLife: number; size: number; hue: number; trail: { x: number; y: number }[];
}

interface LightRay {
  angle: number; width: number; opacity: number; speed: number; hue: number;
}

export default function MagicalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    resize();

    const state = {
      w: canvas.width, h: canvas.height,
      time: 0,
      spirals: [] as SpiralParticle[],
      smoke: [] as SmokePuff[],
      confetti: [] as Confetti[],
      petals: [] as Petal[],
      butterflies: [] as Butterfly[],
      dust: [] as DustTrail[],
      rays: [] as LightRay[],
      cx: canvas.width / 2, cy: canvas.height / 2,
    };

    const initSpirals = () => {
      state.spirals = Array.from({ length: 40 }, (_, i) => ({
        angle: (i / 40) * Math.PI * 2,
        radius: 15 + (i % 8) * 4,
        speed: 0.005 + Math.random() * 0.01,
        size: 1 + Math.random() * 1.5,
        hue: 210 + Math.random() * 30,
        y: (Math.random() - 0.5) * 10,
        ySpeed: (Math.random() - 0.5) * 0.1,
        life: Math.random(),
      }));
    };

    const initSmoke = () => {
      state.smoke = Array.from({ length: 12 }, () => ({
        x: (Math.random() - 0.5) * state.w * 0.6,
        y: (Math.random() - 0.5) * state.h * 0.4,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -0.1 - Math.random() * 0.15,
        size: 80 + Math.random() * 120,
        opacity: 0.02 + Math.random() * 0.03,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const initConfetti = () => {
      state.confetti = Array.from({ length: 15 }, () => ({
        x: (Math.random() - 0.5) * state.w * 0.5,
        y: (Math.random() - 0.5) * state.h * 0.5,
        vx: (Math.random() - 0.5) * 0.2,
        vy: 0.2 + Math.random() * 0.3,
        size: 2 + Math.random() * 3,
        rot: Math.random() * Math.PI * 2,
        rotV: (Math.random() - 0.5) * 0.02,
        opacity: 0.1 + Math.random() * 0.15,
      }));
    };

    const initPetals = () => {
      state.petals = Array.from({ length: 8 }, () => ({
        x: (Math.random() - 0.5) * state.w * 0.4,
        y: (Math.random() - 0.5) * state.h * 0.4,
        vx: (Math.random() - 0.5) * 0.1,
        vy: 0.1 + Math.random() * 0.2,
        size: 3 + Math.random() * 4,
        rot: Math.random() * Math.PI * 2,
        rotV: (Math.random() - 0.5) * 0.01,
        opacity: 0.05 + Math.random() * 0.08,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const initButterflies = () => {
      state.butterflies = Array.from({ length: 5 }, () => ({
        x: (Math.random() - 0.5) * state.w * 0.5,
        y: (Math.random() - 0.5) * state.h * 0.4,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -(Math.random() * 0.1 + 0.05),
        size: 5 + Math.random() * 6,
        phase: Math.random() * Math.PI * 2,
        opacity: 0.15 + Math.random() * 0.15,
        wingAngle: 0, wingSpeed: 0.06 + Math.random() * 0.04,
        hue: 200 + Math.random() * 30,
      }));
    };

    const initRays = () => {
      state.rays = Array.from({ length: 6 }, (_, i) => ({
        angle: (i / 6) * Math.PI * 2 - Math.PI,
        width: 20 + Math.random() * 30,
        opacity: 0.03 + Math.random() * 0.03,
        speed: 0.003 + Math.random() * 0.003,
        hue: 210 + Math.random() * 20,
      }));
    };

    const init = () => {
      state.w = canvas.width;
      state.h = canvas.height;
      state.cx = state.w / 2;
      state.cy = state.h / 2;
      initSpirals();
      initSmoke();
      initConfetti();
      initPetals();
      initButterflies();
      initRays();
    };

    const drawButterfly = (b: Butterfly) => {
      ctx.save();
      ctx.translate(state.cx + b.x, state.cy + b.y);
      ctx.globalAlpha = b.opacity;
      ctx.rotate(b.phase);

      const wing = b.wingAngle;
      const s = b.size;

      ctx.fillStyle = `hsla(${b.hue}, 40%, 75%, ${b.opacity * 0.7})`;
      ctx.strokeStyle = `hsla(${b.hue + 20}, 30%, 85%, ${b.opacity * 0.3})`;
      ctx.lineWidth = 0.5;

      const r1 = Math.abs(s * 0.9 * Math.cos(wing));
      ctx.beginPath();
      ctx.ellipse(0, -s * 0.1, r1, s * 0.6, -0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = `hsla(${b.hue + 10}, 35%, 80%, ${b.opacity * 0.5})`;
      const r2 = Math.abs(s * 0.7 * Math.sin(wing + 0.5));
      ctx.beginPath();
      ctx.ellipse(0, s * 0.1, r2, s * 0.5, 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = `hsla(${b.hue + 20}, 30%, 85%, ${b.opacity * 0.4})`;
      const r3 = Math.abs(s * 0.4 * Math.cos(wing * 0.7));
      ctx.beginPath();
      ctx.ellipse(-s * 0.2, -s * 0.3, r3, s * 0.3, -0.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `hsla(${b.hue + 20}, 30%, 85%, ${b.opacity * 0.4})`;
      const r4 = Math.abs(s * 0.35 * Math.sin(wing * 0.7));
      ctx.beginPath();
      ctx.ellipse(-s * 0.2, s * 0.3, r4, s * 0.25, 0.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `hsla(${b.hue}, 60%, 90%, ${b.opacity * 0.8})`;
      ctx.beginPath();
      ctx.ellipse(s * 0.2, 0, s * 0.15, s * 0.08, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      if (!canvas) return;
      state.w = canvas.width;
      state.h = canvas.height;
      state.cx = state.w / 2;
      state.cy = state.h / 2;
      state.time += 0.016;
      ctx.clearRect(0, 0, state.w, state.h);

      const t = state.time;

      state.rays.forEach((r) => {
        r.opacity = 0.03 + Math.sin(t * r.speed + r.angle) * 0.02;
        ctx.save();
        ctx.translate(state.cx, state.cy);
        ctx.rotate(r.angle + Math.sin(t * r.speed * 0.5) * 0.1);
        const grad = ctx.createLinearGradient(0, 0, state.w * 0.5, 0);
        grad.addColorStop(0, `hsla(${r.hue}, 50%, 85%, 0)`);
        grad.addColorStop(0.3, `hsla(${r.hue}, 40%, 90%, ${r.opacity})`);
        grad.addColorStop(0.7, `hsla(${r.hue}, 40%, 90%, ${r.opacity * 0.5})`);
        grad.addColorStop(1, `hsla(${r.hue}, 50%, 85%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, -r.width);
        ctx.lineTo(state.w * 0.4, -r.width * 0.3);
        ctx.lineTo(state.w * 0.4, r.width * 0.3);
        ctx.lineTo(0, r.width);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });

      state.spirals.forEach((s) => {
        s.angle += s.speed;
        s.y += s.ySpeed;
        s.life += 0.005;

        const rad = s.radius + Math.sin(s.life * 2) * 3;
        const x = Math.cos(s.angle) * rad;
        const y = Math.sin(s.angle) * rad + Math.sin(s.life * 3) * 2 + s.y;
        const alpha = 0.15 + Math.sin(s.life * Math.PI) * 0.1;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = `hsla(${s.hue}, 60%, 88%, 0.6)`;
        ctx.shadowColor = `hsla(${s.hue}, 60%, 90%, 0.3)`;
        ctx.shadowBlur = s.size * 3;
        ctx.beginPath();
        ctx.arc(state.cx + x, state.cy + y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      state.smoke.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.phase += 0.003;
        if (s.y < -state.cy - s.size) { s.y = state.cy * 0.4; s.x = (Math.random() - 0.5) * state.w * 0.5; }

        const pulse = 1 + Math.sin(s.phase) * 0.1;
        ctx.save();
        ctx.globalAlpha = s.opacity * pulse;
        const grad = ctx.createRadialGradient(
          state.cx + s.x, state.cy + s.y, 0,
          state.cx + s.x, state.cy + s.y, s.size * pulse
        );
        grad.addColorStop(0, "rgba(227, 240, 250, 0.15)");
        grad.addColorStop(0.5, "rgba(218, 233, 245, 0.08)");
        grad.addColorStop(1, "rgba(227, 240, 250, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(state.cx + s.x, state.cy + s.y, s.size * pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      state.confetti.forEach((c) => {
        c.x += c.vx;
        c.y += c.vy;
        c.rot += c.rotV;
        if (c.y > state.cy * 0.5) { c.y = -state.cy * 0.4; c.x = (Math.random() - 0.5) * state.w * 0.5; }

        ctx.save();
        ctx.translate(state.cx + c.x, state.cy + c.y);
        ctx.rotate(c.rot);
        ctx.globalAlpha = c.opacity;
        ctx.fillStyle = "rgba(212, 175, 55, 0.4)";
        ctx.shadowColor = "rgba(212, 175, 55, 0.2)";
        ctx.shadowBlur = 4;
        ctx.fillRect(-c.size / 2, -c.size / 4, c.size, c.size / 2);
        ctx.restore();
      });

      state.petals.forEach((p) => {
        p.x += p.vx + Math.sin(state.time * 0.5 + p.phase) * 0.05;
        p.y += p.vy;
        p.rot += p.rotV;
        if (p.y > state.cy * 0.4) { p.y = -state.cy * 0.4; p.x = (Math.random() - 0.5) * state.w * 0.4; }

        ctx.save();
        ctx.translate(state.cx + p.x, state.cy + p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = "rgba(227, 240, 250, 0.2)";
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
        ctx.beginPath();
        ctx.ellipse(p.size * 0.2, 0, p.size * 0.3, p.size * 0.15, 0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      state.butterflies.forEach((b, i) => {
        b.x += b.vx;
        b.y += b.vy;
        b.wingAngle = Math.sin(state.time * b.wingSpeed * 3) * 0.8 + 0.2;
        b.phase += 0.003;
        if (b.y < -state.cy * 0.5 || Math.abs(b.x) > state.w * 0.4) {
          state.butterflies[i] = {
            ...b,
            x: (Math.random() - 0.5) * state.w * 0.3,
            y: state.cy * 0.3,
            vx: (Math.random() - 0.5) * 0.15,
            vy: -(Math.random() * 0.1 + 0.05),
          };
        }
        drawButterfly(b);
      });

      if (state.dust.length < 15 && Math.random() < 0.05) {
        state.dust.push({
          x: (Math.random() - 0.5) * 20,
          y: (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -(Math.random() * 0.2 + 0.1),
          life: 0, maxLife: 120 + Math.random() * 80,
          size: 1 + Math.random() * 1.5,
          hue: Math.random() > 0.5 ? 45 : 210,
          trail: [],
        });
      }

      state.dust = state.dust.filter((d) => {
        d.trail.push({ x: d.x, y: d.y });
        if (d.trail.length > 8) d.trail.shift();
        d.x += d.vx;
        d.y += d.vy;
        d.life++;
        const alpha = Math.sin((d.life / d.maxLife) * Math.PI) * 0.3;

        ctx.save();
        d.trail.forEach((tp, ti) => {
          const ta = (ti / d.trail.length) * alpha;
          ctx.globalAlpha = ta;
          ctx.fillStyle = d.hue === 45 ? "rgba(212, 175, 55, 0.3)" : "rgba(227, 240, 250, 0.2)";
          ctx.beginPath();
          ctx.arc(state.cx + tp.x, state.cy + tp.y, d.size * (ti / d.trail.length), 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();

        return d.life < d.maxLife;
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

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[1]" />;
}
