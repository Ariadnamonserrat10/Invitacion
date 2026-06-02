"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { playAudio, resetAudio, setupAutoplay } from "@/lib/audio";

function makeParticle(container: HTMLElement, css: string): HTMLDivElement {
  const el = document.createElement("div"); el.style.cssText = css; container.appendChild(el); return el;
}

export default function EnvelopeIntroScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const nameShineRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);

  /* Audio — fresh start on mount + autoplay fallback */
  useEffect(() => {
    setMounted(true);
    resetAudio();
    playAudio().catch(() => {});
    const cleanup = setupAutoplay();
    return () => { cleanup(); resetAudio(); };
  }, []);

  /* GSAP Timeline */
  useEffect(() => {
    if (!mounted || !visible) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false);
      }
    });

    tl.set(containerRef.current, { autoAlpha: 1 });
    tl.set(portalRef.current, { scale: 0, opacity: 0 });
    tl.set(glowRef.current, { scale: 0, opacity: 0 });
    tl.set(sparklesRef.current, { autoAlpha: 0 });
    tl.set(titleRef.current, { opacity: 0, scale: 0.4, filter: "blur(12px)" });
    tl.set(nameRef.current, { clipPath: "inset(0 100% 0 0)", opacity: 0 });
    tl.set(nameShineRef.current, { opacity: 0, x: "-120%" });
    tl.set(dividerRef.current, { scaleX: 0, opacity: 0 });

    /* Portal expands */
    tl.to(glowRef.current, { scale: 1.5, opacity: 0.35, duration: 1.6, ease: "power3.out" }, 0.3);
    tl.to(portalRef.current, { scale: 1, opacity: 1, duration: 1.4, ease: "power3.out" }, 0.5);

    /* Golden sparkles radiate */
    tl.set(sparklesRef.current, { autoAlpha: 1 }, 1.5);
    for (let i = 0; i < 10; i++) {
      const sp = makeParticle(sparklesRef.current!, `
        position:absolute;width:2.5px;height:2.5px;border-radius:50%;
        background:${i%3===0?"#FFFFFF":"#D4AF37"};
        box-shadow:0 0 8px ${i%3===0?"rgba(255,255,255,0.5)":"rgba(212,175,55,0.5)"};
        pointer-events:none;z-index:20;
      `);
      const ang = (i/10)*360;
      tl.fromTo(sp, { opacity: 0, scale: 0, left: "50%", top: "50%" },
        { opacity: 0.5, scale: 1, left: `calc(50% + ${Math.cos(ang*Math.PI/180)*25}%)`, top: `calc(50% + ${Math.sin(ang*Math.PI/180)*20}%)`, duration: 1.2+(i%2), ease: "power2.out" }, 1.7+i*0.06);
      tl.to(sp, { opacity: 0, scale: 0.2, duration: 0.4, ease: "power2.in" }, "+=0.2");
    }

    /* Title reveals */
    tl.to(portalRef.current, { opacity: 0.6, scale: 1.3, duration: 0.6, ease: "sine.inOut" }, 2.5);
    tl.to(titleRef.current, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out" }, 2.8);
    tl.to(titleRef.current, {
      textShadow: "0 0 30px rgba(195,224,244,0.5), 0 0 60px rgba(195,224,244,0.2)",
      duration: 0.6, ease: "sine.inOut",
    }, 3.5);
    tl.to(dividerRef.current, { scaleX: 1, opacity: 1, duration: 0.8, ease: "power3.out" }, 3.8);

    /* ── Name reveals with golden shine + sparkle burst ── */
    tl.to(nameRef.current, { opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 2, ease: "power3.out" }, 4.5);
    tl.to(nameShineRef.current, { opacity: 0.7, x: "120%", duration: 1.8, ease: "power2.inOut" }, 4.7);
    tl.to(nameRef.current, {
      textShadow: "0 0 40px rgba(212,175,55,0.45), 0 0 80px rgba(212,175,55,0.25), 0 0 120px rgba(227,240,250,0.15)",
      duration: 1.2, ease: "sine.inOut",
    }, 5.5);
    tl.to(nameShineRef.current, { opacity: 0, duration: 0.3, ease: "sine.in" }, 6.2);

    /* ── Golden sparkle burst at name reveal ── */
    for (let i = 0; i < 30; i++) {
      const p = makeParticle(sparklesRef.current!, `
        position:absolute;width:${2+(i%3)}px;height:${2+(i%3)}px;border-radius:50%;
        background:hsl(${40+(i%8)*5},85%,${55+(i%6)*7}%);
        box-shadow:0 0 ${6+(i%4)*3}px hsl(${40+(i%8)*5},85%,${55+(i%6)*7}%);
        pointer-events:none;z-index:20;
      `);
      const ang = Math.random() * 360;
      const dist = 15 + Math.random() * 30;
      const dx = Math.cos(ang * Math.PI / 180) * dist;
      const dy = Math.sin(ang * Math.PI / 180) * dist;
      tl.set(p, { left: "50%", top: "50%", opacity: 0, scale: 0 }, 4.6 + Math.random() * 0.4);
      tl.to(p, {
        left: `calc(50% + ${dx}%)`, top: `calc(50% + ${dy}%)`,
        opacity: 0.7, scale: 1, duration: 0.6 + Math.random() * 0.3, ease: "power2.out",
      });
      tl.to(p, { opacity: 0, scale: 0.2, duration: 0.4, ease: "power2.in" }, "+=0.3");
    }

    /* Additional golden sweep particles (left to right, more dense) */
    for (let i = 0; i < 50; i++) {
      const p = makeParticle(sparklesRef.current!, `
        position:absolute;width:2px;height:2px;border-radius:50%;
        background:hsl(${42+(i%6)*3},80%,${50+(i%8)*6}%);
        box-shadow:0 0 6px hsl(${42+(i%6)*3},80%,${50+(i%8)*6}%);
        pointer-events:none;z-index:20;
      `);
      const row = i % 12, col = Math.floor(i / 12), del = (col / 5) * 0.25 + (row / 12) * 0.05;
      tl.set(p, { left: "-5%", top: `${3 + (row / 12) * 90}%`, opacity: 0, scale: 0 }, 4.8 + del);
      tl.to(p, { left: `${82 + (row % 3) * 6}%`, opacity: 0.5, scale: 1, duration: 0.25, ease: "power2.out" }, 4.8 + del);
      tl.to(p, { opacity: 0, scale: 0, duration: 0.2, ease: "power2.in" }, "+=0.12");
    }

    /* ── Hold phase ── */
    tl.to(portalRef.current, { scale: 1.1, opacity: 0.4, duration: 0.8, ease: "sine.inOut", repeat: 1, yoyo: true }, 6.5);
    tl.to(glowRef.current, { scale: 1.6, opacity: 0.2, duration: 1, ease: "sine.inOut", repeat: 1, yoyo: true }, 6.5);

    /* Floating upward particles */
    for (let i = 0; i < 12; i++) {
      const fp = makeParticle(sparklesRef.current!, `
        position:absolute;width:${1.5+(i%3)}px;height:${1.5+(i%3)}px;border-radius:50%;
        background:${i%4===0?"#E3F0FA":i%4===1?"#FFFFFF":"#D4AF37"};
        box-shadow:0 0 6px ${i%4===0?"rgba(227,240,250,0.4)":i%4===1?"rgba(255,255,255,0.3)":"rgba(212,175,55,0.4)"};
        pointer-events:none;z-index:18;opacity:0;
      `);
      tl.set(fp, { left: `${35+(i*3)%30}%`, top: "55%", scale: 0 }, 6.7+i*0.05);
      tl.to(fp, { top: `${5+(i%6)*5}%`, opacity: 0.4, scale: 1, duration: 1.5+(i%3), ease: "power1.out" }, 6.7+i*0.05);
      tl.to(fp, { opacity: 0, duration: 0.3, ease: "power1.in" }, "+=0.8");
    }

    /* Glow pulse on name */
    tl.to(nameRef.current, {
      textShadow: "0 0 50px rgba(212,175,55,0.6), 0 0 100px rgba(212,175,55,0.3), 0 0 150px rgba(227,240,250,0.2)",
      duration: 0.5, ease: "sine.inOut",
    }, 7);
    tl.to(nameRef.current, {
      textShadow: "0 0 30px rgba(212,175,55,0.4), 0 0 60px rgba(212,175,55,0.2), 0 0 100px rgba(227,240,250,0.1)",
      duration: 0.5, ease: "sine.inOut",
    }, 7.8);

    /* Light rays sweep */
    for (let i = 0; i < 3; i++) {
      const ray = makeParticle(sparklesRef.current!, `
        position:absolute;bottom:0;left:${30+i*15}%;width:2px;height:25%;
        background:linear-gradient(0deg,transparent,rgba(255,255,255,0.04),transparent);
        pointer-events:none;z-index:3;opacity:0;
      `);
      tl.fromTo(ray, { opacity: 0, scaleX: 0.3 }, { opacity: 0.4, scaleX: 1, duration: 1, ease: "power1.out" }, 7.2+i*0.06);
      tl.to(ray, { opacity: 0, duration: 0.4, ease: "power1.in" }, "+=0.6");
    }

    /* Final fade-out */
    tl.to(containerRef.current, { opacity: 0, duration: 0.8, ease: "power2.in" }, 8.5);

    return () => { tl.kill(); };
  }, [mounted]);

  if (!mounted || !visible) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden invisible opacity-0">
      {/* Background */}
      <div className="absolute inset-0" style={{
        background: [
          "radial-gradient(ellipse at 50% 30%, rgba(227,240,250,0.2) 0%, transparent 50%)",
          "radial-gradient(ellipse at 50% 70%, rgba(195,224,244,0.12) 0%, transparent 50%)",
          "radial-gradient(ellipse at 20% 50%, rgba(218,233,245,0.15) 0%, transparent 40%)",
          "radial-gradient(ellipse at 80% 50%, rgba(218,233,245,0.1) 0%, transparent 40%)",
          "linear-gradient(180deg, #D6E8F5 0%, #E6F0F8 30%, #EDF3FA 50%, #E6F0F8 70%, #D6E8F5 100%)",
        ].join(","),
      }} />

      {/* Outer glow */}
      <div ref={glowRef} className="absolute" style={{
        width: "80vmin", height: "80vmin",
        background: "radial-gradient(circle, rgba(227,240,250,0.15) 0%, rgba(195,224,244,0.06) 30%, transparent 60%)",
        borderRadius: "50%",
      }} />

      {/* Portal */}
      <div ref={portalRef} className="absolute" style={{
        width: "55vmin", height: "55vmin",
        background: [
          "radial-gradient(circle at 45% 40%, rgba(255,255,255,0.25) 0%, rgba(227,240,250,0.12) 25%, rgba(195,224,244,0.06) 50%, transparent 75%)",
          "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)",
        ].join(","),
        borderRadius: "50%",
        boxShadow: "0 0 80px rgba(227,240,250,0.15), 0 0 200px rgba(195,224,244,0.08)",
      }} />

      {/* Sparkles container */}
      <div ref={sparklesRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }} />

      {/* Title & Name */}
      <div className="absolute inset-0 z-[30] flex flex-col items-center justify-center" onClick={() => playAudio().catch(() => {})}>
        <div className="text-center px-6">
          <h1 ref={titleRef}
            className="font-[var(--font-cinzel)] tracking-[0.25em] leading-relaxed"
            style={{
              color: "#1E3A5F",
              fontSize: "clamp(1.2rem, 4.5vmin, 3rem)",
              textShadow: "0 0 15px rgba(195,224,244,0.3)",
            }}
          >
            MIS XV AÑOS
          </h1>

          <div ref={dividerRef} className="h-px mx-auto my-4 md:my-6" style={{
            width: "35%",
            background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)",
            transformOrigin: "center center",
          }} />

          <div ref={nameRef} className="relative overflow-hidden" style={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}>
            <h2 className="font-[var(--font-great-vibes)] leading-tight relative z-10"
              style={{
                color: "#D4AF37",
                fontSize: "clamp(1.6rem, 6.5vmin, 4.5rem)",
                textShadow: "0 0 20px rgba(212,175,55,0.2)",
              }}>
              Suri Michelle Velasco Aparicio
            </h2>
            <div ref={nameShineRef} className="absolute inset-0 z-20 pointer-events-none" style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), rgba(212,175,55,0.2), rgba(255,255,255,0.15), transparent)",
              width: "200%",
              transform: "skewX(-20deg)",
            }} />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <motion.div className="flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.2, 0] }}
          transition={{ duration: 4, repeat: 1, ease: "easeInOut", delay: 4 }}
        >
          <span className="text-[9px] tracking-[0.35em] uppercase font-[var(--font-cinzel)]" style={{ color: "rgba(58,90,122,0.2)" }}>
            Pronto
          </span>
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
            <path d="M10 3v14M5 12l5 5 5-5" stroke="rgba(58,90,122,0.12)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
