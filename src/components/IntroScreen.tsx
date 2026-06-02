"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function IntroScreen() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollPercent = Math.max(0, Math.min(1, -rect.top / window.innerHeight));
      containerRef.current.style.opacity = String(1 - scrollPercent);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ willChange: "opacity" }}
    >
      {/* Animated gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(186,209,236,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(137,170,215,0.08) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(163,191,223,0.06) 0%, transparent 50%)",
        }}
      />

      {/* Floating orbs */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            width: 100 + i * 60,
            height: 100 + i * 60,
            left: `${15 + i * 18}%`,
            top: `${20 + (i % 3) * 25}%`,
            background: `radial-gradient(circle, rgba(186,209,236,0.06) 0%, transparent 70%)`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Opening line */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="mb-6"
        >
          <p className="text-[#BAD1EC] text-sm md:text-lg tracking-[0.3em] uppercase font-[var(--font-cinzel)]">
            Con alegría en el corazón
          </p>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="h-px w-24 md:w-48 mx-auto mb-8"
          style={{
            background: "linear-gradient(90deg, transparent, #BAD1EC, transparent)",
          }}
        />

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-[var(--font-great-vibes)] text-[#E3F0FA] mb-6 leading-tight"
          style={{ textShadow: "0 0 40px rgba(186,209,236,0.4), 0 0 80px rgba(137,170,215,0.2)" }}
        >
          Mi Quinceañera
        </motion.h1>

        {/* Decorative separator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <span className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-[#BAD1EC]" />
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block w-2 h-2 rounded-full bg-[#BAD1EC] shadow-lg shadow-[#BAD1EC]/50"
          />
          <span className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-[#BAD1EC]" />
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 2, ease: "easeOut" }}
        >
          <h2
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-[var(--font-playfair)] font-bold text-gradient mb-4"
            style={{ textShadow: "0 0 30px rgba(186,209,236,0.3)" }}
          >
            Suri Michelle
          </h2>
          <h2
            className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-[var(--font-playfair)] font-bold text-gradient mb-6"
            style={{ textShadow: "0 0 30px rgba(186,209,236,0.3)" }}
          >
            Velasco Aparicio
          </h2>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 2.5 }}
          className="h-px w-24 md:w-48 mx-auto mb-8"
          style={{
            background: "linear-gradient(90deg, transparent, #BAD1EC, transparent)",
          }}
        />

        {/* Date */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 2.8 }}
          className="text-[#A4BFDF] text-sm md:text-lg font-[var(--font-poppins)] tracking-[0.2em]"
        >
          — 15 de Marzo, 2025 —
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 3.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[#BAD1EC] text-xs tracking-[0.2em] uppercase font-[var(--font-poppins)]">
              Descubre
            </span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <motion.path
                d="M10 3v14M5 12l5 5 5-5"
                stroke="#BAD1EC"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{ pathLength: [0, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a1a] to-transparent" />
    </section>
  );
}
