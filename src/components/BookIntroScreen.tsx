"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

interface MsgParticle {
  startX: string; endX: string; startY: string; endY: string;
  dur: number; del: number; isGold: boolean;
}

function generateMsgParticles(): MsgParticle[] {
  const p: MsgParticle[] = [];
  for (let i = 0; i < 15; i++) {
    p.push({
      startX: `${((i * 37) % 100) - 50}%`,
      endX: `${((i * 53) % 100) - 50}%`,
      startY: `${(i * 29) % 100}%`,
      endY: `${(i * 41) % 100}%`,
      dur: 5 + (i % 5), del: (i % 3) * 1.5, isGold: i % 3 === 0,
    });
  }
  return p;
}

export default function BookIntroScreen({ onIntroComplete }: { onIntroComplete?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const bookWrapperRef = useRef<HTMLDivElement>(null);
  const coverLeftRef = useRef<HTMLDivElement>(null);
  const coverRightRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);
  const monogramRef = useRef<HTMLDivElement>(null);
  const pagesRef = useRef<HTMLDivElement>(null);
  const pageStackRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const nameSparkleRef = useRef<HTMLDivElement>(null);
  const nameSweepRef = useRef<HTMLDivElement>(null);
  const sweepParticlesRef = useRef<HTMLDivElement[]>([]);
  const messageRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [msgParticles] = useState(generateMsgParticles);

  const introComplete = useCallback(() => {
    setShowTransition(true);
    setTimeout(() => {
      setShowIntro(false);
      onIntroComplete?.();
    }, 2500);
  }, [onIntroComplete]);

  const animateMessage = useCallback(() => {
    if (!messageRef.current) return;
    const lines = messageRef.current.querySelectorAll(".msg-line");
    const tl = gsap.timeline({ onComplete: () => setTimeout(() => introComplete(), 5000) });
    lines.forEach((line, i) => {
      tl.fromTo(line, { opacity: 0, y: 25, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 2, ease: "power3.out" }, i * 2
      );
    });
  }, [introComplete]);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setShowMessage(true);
        setTimeout(() => animateMessage(), 600);
      },
    });

    tl.set(containerRef.current, { autoAlpha: 1 });

    tl.fromTo(glowRef.current, { opacity: 0, scale: 0.1 }, { opacity: 1, scale: 1, duration: 3, ease: "power2.out" }, 0.5);

    tl.fromTo(bookWrapperRef.current, { opacity: 0, scale: 0.25, y: 60 },
      { opacity: 1, scale: 1, y: 0, duration: 3.5, ease: "elastic.out(1, 0.5)" }, 2.5);

    tl.to(bookWrapperRef.current, { y: -6, duration: 4, ease: "sine.inOut", repeat: -1, yoyo: true }, 6);

    tl.to(coverLeftRef.current, { rotationY: 165, transformOrigin: "100% 50%", duration: 2.8, ease: "power2.inOut" }, 8.8);
    tl.to(coverRightRef.current, { rotationY: -165, transformOrigin: "0% 50%", duration: 2.8, ease: "power2.inOut" }, 8.8);

    tl.to(monogramRef.current, { opacity: 0, scale: 1.4, duration: 1.5, ease: "power2.out" }, 9.2);

    tl.to(pagesRef.current, { opacity: 1, duration: 1.2, ease: "power2.out" }, 9.5);
    tl.to(pageStackRef.current, { scaleY: 1, transformOrigin: "50% 100%", duration: 0.8, ease: "power3.out" }, 9.5);

    tl.to(titleRef.current, { clipPath: "inset(0 0% 0 0)", duration: 1.8, ease: "power3.out" }, 10.5);
    tl.to(titleRef.current, {
      textShadow: "0 0 30px rgba(227,240,250,0.5), 0 0 60px rgba(195,224,244,0.25)",
      duration: 1, ease: "sine.inOut",
    }, 11.5);

    tl.to(nameRef.current, { clipPath: "inset(0 0% 0 0)", duration: 2.2, ease: "power3.out" }, 12);
    tl.to(nameRef.current, {
      textShadow: "0 0 30px rgba(212,175,55,0.3), 0 0 60px rgba(212,175,55,0.15), 0 0 100px rgba(227,240,250,0.2)",
      duration: 1.5, ease: "sine.inOut",
    }, 13.5);
    tl.call(() => triggerNameSweep(), [], 12);

    return () => { tl.kill(); };
  }, [mounted, animateMessage]);

  useEffect(() => {
    if (!mounted || !nameSparkleRef.current) return;
    const container = nameSparkleRef.current;
    const particles: (HTMLDivElement | HTMLImageElement)[] = [];
    for (let i = 0; i < 30; i++) {
      const isStar = i < 8;
      const el = document.createElement("div");
      const size = isStar ? 2 + ((i * 3) % 3) : 1.5 + ((i * 3) % 3);
      const isGold = isStar || i % 2 === 0;
      const starShape = isStar ? `polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)` : "50%";
      el.style.cssText = `
        position:absolute;width:${size * 2.5}px;height:${size * 2.5}px;
        ${isStar ? `clip-path:${starShape};background:${isGold ? "#D4AF37" : "#FFF5D6"};` : `border-radius:50%;background:${isGold ? "#D4AF37" : "#E3F0FA"};`}
        box-shadow:0 0 ${size * 5}px ${isGold ? "rgba(212,175,55,0.6)" : "rgba(227,240,250,0.4)"};
        pointer-events:none;opacity:0;
        transform:scale(0) ${isStar ? "rotate(0deg)" : ""};
      `;
      container.appendChild(el);
      particles.push(el);

      const interval = window.setInterval(() => {
        const startX = ((i * 31 + Math.floor(Date.now() / 3000)) * 13) % 100;
        const startY = ((i * 17 + Math.floor(Date.now() / 3000)) * 11) % 100;
        const endX = ((i * 23 + Math.floor(Date.now() / 3000)) * 7) % 100;
        const endY = ((i * 19 + Math.floor(Date.now() / 3000)) * 5) % 100;
        const d = 2 + (i % 3);
        el.animate([
          { opacity: 0, transform: `scale(0) ${isStar ? "rotate(0deg)" : ""}`, left: `${startX}%`, top: `${startY}%` },
          { opacity: isStar ? 1 : 0.8, transform: `scale(1) ${isStar ? "rotate(180deg)" : ""}`, offset: 0.2 },
          { opacity: 0.3, transform: `scale(0.6) ${isStar ? "rotate(270deg)" : ""}`, offset: 0.7 },
          { opacity: 0, transform: `scale(0) ${isStar ? "rotate(360deg)" : ""}`, left: `${endX}%`, top: `${endY}%` },
        ], { duration: d * 1000 + 500, delay: (i % 4) * 200, iterations: 1, fill: "forwards" });
      }, 3000 + (i % 3) * 400);
      (el as any)._interval = interval;
    }
    return () => {
      particles.forEach((p) => { clearInterval((p as any)._interval); p.remove(); });
    };
  }, [mounted]);

  const triggerNameSweep = useCallback(() => {
    if (!nameSweepRef.current) return;
    const container = nameSweepRef.current;
    container.innerHTML = "";
    const count = 60;
    const particles: HTMLDivElement[] = [];
    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      const size = 1.5 + (i % 3) * 0.8;
      const isStar = i % 7 === 0;
      const gold = `hsl(${42 + (i % 8)}, ${75 + (i % 20)}%, ${50 + (i % 3) * 10}%)`;
      el.style.cssText = `
        position:absolute;width:${isStar ? size * 3 : size}px;height:${isStar ? size * 3 : size}px;
        left:0;top:${(i / count) * 100}%;
        ${isStar ? `clip-path:polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);background:${gold};` : `border-radius:50%;background:${gold};`}
        box-shadow:0 0 ${size * 5}px rgba(212,175,55,0.5);
        pointer-events:none;opacity:0;
      `;
      container.appendChild(el);
      particles.push(el);
    }
    sweepParticlesRef.current = particles;
    const wave = gsap.timeline();
    const rows = 10;
    const cols = 6;
    particles.forEach((p, i) => {
      const row = i % rows;
      const col = Math.floor(i / rows);
      const delay = (col / cols) * 0.8 + (row / rows) * 0.15;
      wave.to(p, {
        left: `${90 + (row % 3) * 3}%`,
        top: `${(row / rows) * 100 + (col % 2 === 0 ? -3 : 3)}%`,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      }, delay);
      wave.to(p, {
        opacity: 0,
        scale: 0,
        duration: 0.6,
        ease: "power3.in",
      }, delay + 0.6);
    });
    wave.to({}, { duration: 1.2, onComplete: () => { container.innerHTML = ""; } });
  }, []);

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          ref={containerRef}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden"
          style={{ visibility: "hidden" }}
        >
          <div className="absolute inset-0" style={{
            background: [
              "radial-gradient(ellipse at 50% 30%, rgba(227,240,250,0.2) 0%, transparent 50%)",
              "radial-gradient(ellipse at 50% 70%, rgba(195,224,244,0.12) 0%, transparent 50%)",
              "radial-gradient(ellipse at 20% 50%, rgba(218,233,245,0.15) 0%, transparent 40%)",
              "radial-gradient(ellipse at 80% 50%, rgba(218,233,245,0.1) 0%, transparent 40%)",
              "linear-gradient(180deg, #D6E8F5 0%, #E6F0F8 30%, #EDF3FA 50%, #E6F0F8 70%, #D6E8F5 100%)",
            ].join(","),
          }} />

          <div ref={glowRef} className="absolute" style={{
            width: "90vmin", height: "90vmin",
            background: "radial-gradient(circle, rgba(227,240,250,0.15) 0%, rgba(195,224,244,0.06) 30%, rgba(58,90,122,0.03) 55%, transparent 70%)",
            borderRadius: "50%", opacity: 0,
          }} />

          {mounted && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 16 }).map((_, i) => (
                <motion.div
                  key={`lr-${i}`}
                  className="absolute" style={{
                    width: `${10 + ((i * 17) % 30)}%`, height: "2px",
                    left: `${(i * 31) % 100}%`, top: `${(i * 47) % 100}%`,
                    background: `linear-gradient(90deg, transparent, ${i % 3 === 0 ? "rgba(212,175,55,0.12)" : "rgba(227,240,250,0.1)"}, transparent)`,
                    transform: `rotate(${(i * 53) % 360}deg)`, filter: "blur(1px)",
                  }}
                  animate={{ opacity: [0, 0.4, 0], scaleX: [0, 1, 0] }}
                  transition={{ duration: 3 + (i % 3), delay: i * 0.3 + 2, repeat: Infinity, ease: "easeInOut" }}
                />
              ))}
            </div>
          )}

          <div ref={bookWrapperRef} className="relative flex items-center justify-center" style={{ perspective: "1500px", opacity: 0 }}>
            <div className="relative" style={{ width: "65vmin", height: "88vmin", transformStyle: "preserve-3d", perspective: "1500px" }}>

              <div ref={spineRef} className="absolute" style={{
                width: "1.2vmin", height: "100%", left: "50%", marginLeft: "-0.6vmin", top: 0, zIndex: 4,
                background: "linear-gradient(180deg, #162D4A 0%, #1E3A5F 40%, #2C5A8A 60%, #1E3A5F 100%)",
                boxShadow: "0 0 15px rgba(0,0,0,0.3), inset 0 0 10px rgba(212,175,55,0.1)",
                borderLeft: "1px solid rgba(212,175,55,0.15)",
                borderRight: "1px solid rgba(212,175,55,0.15)",
                borderRadius: "0.3vmin",
              }} />

              <div ref={pageStackRef} className="absolute" style={{
                width: "96%", height: "96%", left: "2%", top: "2%", zIndex: 0,
                transform: "scaleY(1)", transformOrigin: "50% 100%",
              }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={`pg-${i}`} className="absolute inset-0 rounded-[1vmin]" style={{
                    background: i === 4 ? "#F0F4FA" : `linear-gradient(180deg, #F8FAFE 0%, #EDF3FA ${50 + i * 8}%, #${180 + i * 5}${190 + i * 5}${198 + i * 5} 100%)`,
                    boxShadow: i < 4 ? "inset 0 2px 4px rgba(0,0,0,0.02)" : "inset 0 0 20px rgba(195,224,244,0.15)",
                    transform: `translate(${4 - i * 0.8}px, ${1 + i * 1.5}px)`,
                    zIndex: i,
                    border: "1px solid rgba(218,233,245,0.5)",
                    borderTop: "none",
                  }} />
                ))}
              </div>

              <div ref={pagesRef} className="absolute inset-0 rounded-[1.5vmin] flex flex-col items-center justify-center p-[6%]"
                style={{
                  opacity: 0, zIndex: 6,
                  background: "linear-gradient(180deg, #F8FAFE 0%, #EDF3FA 40%, #E6F0F8 100%)",
                  boxShadow: "inset 0 0 30px rgba(195,224,244,0.2), 0 2px 20px rgba(0,0,0,0.06)",
                  overflow: "hidden",
                }}
              >
                <div className="absolute inset-[3%] rounded-[1vmin]" style={{ border: "1px solid rgba(195,224,244,0.25)", pointerEvents: "none" }} />

                <div className="absolute inset-0" style={{
                  background: "radial-gradient(ellipse at 50% 40%, rgba(227,240,250,0.08) 0%, transparent 60%)",
                }} />

                <div className="relative z-10 text-center w-full">
                  <h1 ref={titleRef}
                    className="text-3xl sm:text-4xl md:text-5xl font-[var(--font-great-vibes)] leading-tight mb-2"
                    style={{
                      color: "#1E3A5F",
                      clipPath: "inset(0 100% 0 0)",
                    }}
                  >
                    Mis XV Años
                  </h1>

                  <div className="w-2/3 h-px mx-auto my-3" style={{
                    background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)",
                  }} />

                  <div ref={nameRef} className="relative" style={{ clipPath: "inset(0 100% 0 0)" }}>
                    <h2
                      className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[var(--font-great-vibes)] leading-tight"
                      style={{
                        color: "#D4AF37",
                        textShadow: "0 0 20px rgba(212,175,55,0.4), 0 0 40px rgba(212,175,55,0.2), 0 0 80px rgba(212,175,55,0.1)",
                      }}
                    >
                      𝓢𝓾𝓻𝓲 𝓜𝓲𝓬𝓱𝓮𝓵𝓵𝓮 𝓥𝓮𝓵𝓪𝓼𝓬𝓸 𝓐𝓹𝓪𝓻𝓲𝓬𝓲𝓸
                    </h2>
                  </div>
                  <div ref={nameSparkleRef} className="absolute inset-0 pointer-events-none" />
                  <div ref={nameSweepRef} className="absolute inset-0 pointer-events-none" />
                </div>

                <div className="absolute bottom-[5%] left-[10%] right-[10%] text-center">
                  <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(195,224,244,0.3), transparent)" }} />
                </div>
              </div>

              <div ref={coverLeftRef} className="absolute rounded-l-[1.5vmin]" style={{
                width: "50%", height: "100%", left: 0, top: 0, zIndex: 8,
                transformOrigin: "100% 50%",
                background: "linear-gradient(165deg, #1E3A5F 0%, #2C5A8A 25%, #1E3A5F 50%, #162D4A 75%, #1E3A5F 100%)",
                border: "2px solid rgba(212,175,55,0.3)",
                borderRight: "1px solid rgba(212,175,55,0.1)",
                borderTopLeftRadius: "1.5vmin", borderBottomLeftRadius: "1.5vmin",
                boxShadow: "0 8px 40px rgba(0,0,0,0.35), inset 0 0 50px rgba(0,0,0,0.15)",
                overflow: "hidden",
              }}>
                <div className="absolute inset-[5%] rounded-[1vmin]" style={{
                  border: "1px solid rgba(212,175,55,0.18)", borderRight: "none",
                  borderTopLeftRadius: "1vmin", borderBottomLeftRadius: "1vmin",
                }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(212,175,55,0.04) 0%, transparent 30%, transparent 70%, rgba(212,175,55,0.02) 100%)" }} />
                <div className="absolute" style={{ top: "5%", right: "8%", width: "35%", height: "1px", background: "linear-gradient(90deg, rgba(212,175,55,0.25), transparent)" }} />
                <div className="absolute" style={{ bottom: "5%", right: "8%", width: "25%", height: "1px", background: "linear-gradient(90deg, rgba(212,175,55,0.12), transparent)" }} />
              </div>

              <div ref={coverRightRef} className="absolute rounded-r-[1.5vmin]" style={{
                width: "50%", height: "100%", right: 0, top: 0, zIndex: 8,
                transformOrigin: "0% 50%",
                background: "linear-gradient(195deg, #1E3A5F 0%, #2C5A8A 25%, #1E3A5F 50%, #162D4A 75%, #1E3A5F 100%)",
                border: "2px solid rgba(212,175,55,0.3)",
                borderLeft: "1px solid rgba(212,175,55,0.1)",
                borderTopRightRadius: "1.5vmin", borderBottomRightRadius: "1.5vmin",
                boxShadow: "0 8px 40px rgba(0,0,0,0.35), inset 0 0 50px rgba(0,0,0,0.15)",
                overflow: "hidden",
              }}>
                <div className="absolute inset-[5%] rounded-[1vmin]" style={{
                  border: "1px solid rgba(212,175,55,0.18)", borderLeft: "none",
                  borderTopRightRadius: "1vmin", borderBottomRightRadius: "1vmin",
                }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(212,175,55,0.04) 0%, transparent 30%, transparent 70%, rgba(212,175,55,0.02) 100%)" }} />
                <div className="absolute" style={{ top: "5%", left: "8%", width: "35%", height: "1px", background: "linear-gradient(270deg, rgba(212,175,55,0.25), transparent)" }} />
                <div className="absolute" style={{ bottom: "5%", left: "8%", width: "25%", height: "1px", background: "linear-gradient(270deg, rgba(212,175,55,0.12), transparent)" }} />
              </div>

              <div ref={monogramRef} className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 9, pointerEvents: "none" }}>
                <div className="relative text-center -mt-4">
                  <svg viewBox="0 0 70 50" className="w-10 h-8 md:w-14 md:h-10 mx-auto mb-1" style={{ filter: "drop-shadow(0 0 10px rgba(212,175,55,0.3))" }}>
                    <defs>
                      <linearGradient id="cr-s" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#E8EDF5" /><stop offset="30%" stopColor="#FFFFFF" />
                        <stop offset="60%" stopColor="#D4DCE8" /><stop offset="100%" stopColor="#C3CEDA" />
                      </linearGradient>
                    </defs>
                    <path d="M6 42 L6 18 L18 28 L35 5 L52 28 L64 18 L64 42 Z" fill="url(#cr-s)" opacity="0.85" />
                    <path d="M6 42 L6 18 L18 28 L35 5 L52 28 L64 18 L64 42 Z" fill="none" stroke="rgba(212,175,55,0.25)" strokeWidth="0.5" />
                    <circle cx="35" cy="18" r="2.5" fill="#FFFFFF" opacity="0.5" />
                    <circle cx="35" cy="18" r="1.2" fill="rgba(212,175,55,0.4)" />
                    <rect x="24" y="37" width="22" height="5" rx="1.5" fill="url(#cr-s)" opacity="0.25" />
                    <path d="M16 24 Q20 20 24 24" stroke="#D4AF37" strokeWidth="0.8" fill="none" opacity="0.3" />
                    <path d="M46 24 Q50 20 54 24" stroke="#D4AF37" strokeWidth="0.8" fill="none" opacity="0.3" />
                  </svg>

                  <svg viewBox="0 0 80 90" className="w-20 h-22 md:w-24 md:h-26 mx-auto" style={{ filter: "drop-shadow(0 0 12px rgba(227,240,250,0.3)) drop-shadow(0 0 25px rgba(212,175,55,0.1))" }}>
                    <defs>
                      <linearGradient id="s-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="20%" stopColor="#E8EDF5" />
                        <stop offset="50%" stopColor="#D4DCE8" />
                        <stop offset="80%" stopColor="#E8EDF5" />
                        <stop offset="100%" stopColor="#FFFFFF" />
                      </linearGradient>
                      <radialGradient id="s-gl" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="rgba(227,240,250,0.2)" />
                        <stop offset="100%" stopColor="rgba(227,240,250,0)" />
                      </radialGradient>
                    </defs>
                    <ellipse cx="40" cy="45" rx="30" ry="34" fill="url(#s-gl)" opacity="0.35" />
                    <path d="M52 18 C60 22 64 30 62 38 C60 44 54 47 48 48 C40 50 32 50 28 54 C24 58 24 64 28 68 C32 72 38 74 44 72 C50 70 54 66 56 62"
                      fill="none" stroke="url(#s-grad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
                    <path d="M28 22 C24 28 22 36 28 42 C32 46 44 44 48 42"
                      fill="none" stroke="url(#s-grad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
                    <path d="M40 12 Q52 10 58 16"
                      fill="none" stroke="url(#s-grad)" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
                    <path d="M30 62 Q36 60 40 62 Q44 64 48 60"
                      fill="none" stroke="url(#s-grad)" strokeWidth="2" strokeLinecap="round" opacity="0.25" />
                    <circle cx="60" cy="34" r="1.2" fill="#FFFFFF" opacity="0.25" />
                    <circle cx="22" cy="28" r="0.8" fill="#FFFFFF" opacity="0.2" />
                    <circle cx="36" cy="16" r="0.6" fill="#FFFFFF" opacity="0.3" />
                    <circle cx="52" cy="68" r="0.7" fill="#FFFFFF" opacity="0.2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {mounted && !showMessage && (
            <div className="absolute bottom-[12%] left-1/2 -translate-x-1/2 z-10">
              <motion.div className="flex flex-col items-center gap-2"
                animate={{ opacity: [0.15, 0.45, 0.15] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-[9px] tracking-[0.35em] uppercase font-[var(--font-cinzel)]" style={{ color: "rgba(58,90,122,0.3)" }}>Pronto</span>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                  <path d="M10 3v14M5 12l5 5 5-5" stroke="rgba(58,90,122,0.2)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </div>
          )}

          <AnimatePresence>
            {showMessage && mounted && (
              <motion.div ref={messageRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="fixed inset-0 z-[95] flex items-center justify-center p-6 md:p-12"
                style={{ background: "radial-gradient(ellipse at center, rgba(230,240,248,0.97) 0%, rgba(230,240,248,0.99) 100%)" }}
              >
                <div className="max-w-2xl mx-auto text-center space-y-5 md:space-y-7">
                  <p className="msg-line text-sm md:text-base lg:text-lg font-[var(--font-playfair)] italic leading-relaxed" style={{ color: "rgba(30,58,95,0.85)", opacity: 0 }}>
                    &ldquo;Fifteen years ago, a beautiful story began, filled with learning, dreams, and smiles, built through unforgettable moments that have shaped my life and my heart.
                  </p>
                  <p className="msg-line text-sm md:text-base lg:text-lg font-[var(--font-playfair)] italic leading-relaxed" style={{ color: "rgba(30,58,95,0.85)", opacity: 0 }}>
                    Today I take an important step into a new chapter, filled with hopes, goals, and new dreams waiting to come true.
                  </p>
                  <p className="msg-line text-sm md:text-base lg:text-lg font-[var(--font-playfair)] italic leading-relaxed" style={{ color: "rgba(30,58,95,0.85)", opacity: 0 }}>
                    With God&rsquo;s blessing, the love of my family, and the affection of those who have been part of my journey, I would be honored to have you join me in celebrating my XV Years and sharing this magical day full of emotions, joy, love, and happiness.&rdquo;
                  </p>
                </div>
                {msgParticles.map((p, i) => (
                  <motion.div key={`mp-${i}`} className="absolute w-1 h-1 rounded-full"
                    style={{ background: p.isGold ? "#D4AF37" : "#E3F0FA", boxShadow: `0 0 6px ${p.isGold ? "rgba(212,175,55,0.5)" : "rgba(227,240,250,0.4)"}` }}
                    animate={{ x: [p.startX, p.endX], y: [p.startY, p.endY], opacity: [0, 0.6, 0] }}
                    transition={{ duration: p.dur, repeat: Infinity, delay: p.del, ease: "easeInOut" }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {showTransition && (
            <motion.div className="fixed inset-0 z-[96]" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              style={{ background: "radial-gradient(ellipse at center, rgba(227,240,250,0.15) 0%, transparent 60%)", pointerEvents: "none" }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
