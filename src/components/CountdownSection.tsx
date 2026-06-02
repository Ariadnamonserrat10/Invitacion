"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Sparkles from "./Sparkles";
import GoldSparkles from "./GoldSparkles";

const TARGET = new Date("2026-07-25T14:00:00");
interface TimeLeft { days: number; hours: number; minutes: number; seconds: number; }
function calc(): TimeLeft {
  const diff = Math.max(0, TARGET.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

const units = [
  { key: "days", label: "Días" },
  { key: "hours", label: "Horas" },
  { key: "minutes", label: "Minutos" },
  { key: "seconds", label: "Segundos" },
] as const;

export default function CountdownSection() {
  const [tl, setTl] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => { setTl(calc()); const id = setInterval(() => setTl(calc()), 1000); return () => clearInterval(id); }, []);

  const items = [
    { value: tl.days, label: "Días", index: 0 },
    { value: tl.hours, label: "Horas", index: 1 },
    { value: tl.minutes, label: "Minutos", index: 2 },
    { value: tl.seconds, label: "Segundos", index: 3 },
  ];

  return (
    <section id="countdown" className="section-container relative">
      <Sparkles count={12} />
      <GoldSparkles count={8} />

      <div className="relative z-10 w-full max-w-lg mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase font-[var(--font-cinzel)] mb-2" style={{ color: "#3A5A7A" }}>
            Faltan
          </p>
          <div className="h-px w-16 mx-auto mb-8" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.15), transparent)" }} />
          <h2 className="text-2xl md:text-4xl font-[var(--font-great-vibes)] mb-10"
            style={{ color: "#1E3A5F", textShadow: "0 0 20px rgba(227,240,250,0.3)" }}>
            Para el gran día
          </h2>
        </motion.div>

        {/* Contador */}
        <div className="grid grid-cols-4 gap-2 md:gap-4">
          {items.map((item) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-80px" }}
              transition={{ duration: 0.5, delay: item.index * 0.08, ease: "easeOut" }}
              className="relative"
            >
              <motion.div
                className="rounded-xl md:rounded-2xl text-center py-3 px-1 md:py-5 md:px-2"
                style={{
                  border: "1px solid rgba(212,175,55,0.12)",
                  background: "linear-gradient(160deg, rgba(227,240,250,0.15), rgba(212,175,55,0.02))",
                  boxShadow: "0 2px 12px rgba(212,175,55,0.03), 0 1px 0 rgba(212,175,55,0.04) inset",
                }}
                whileHover={{ scale: 1.05, borderColor: "rgba(212,175,55,0.25)" }}
              >
                <motion.p
                  key={item.value}
                  initial={{ y: -12, opacity: 0, scale: 0.85 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="text-lg sm:text-2xl md:text-4xl font-[var(--font-cinzel)] font-bold leading-none"
                  style={{ color: "#D4AF37", textShadow: "0 0 12px rgba(212,175,55,0.2)" }}
                >
                  {String(item.value).padStart(2, "0")}
                </motion.p>
                <p className="text-[8px] md:text-[10px] mt-2 uppercase tracking-[0.25em] font-[var(--font-poppins)] font-light"
                  style={{ color: "rgba(58,90,122,0.5)" }}>
                  {item.label}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Fecha destacada */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="h-px w-16 mx-auto mb-6" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.1), transparent)" }} />
          <p className="font-[var(--font-great-vibes)] leading-tight"
            style={{
              color: "#D4AF37",
              fontSize: "clamp(1.8rem, 7vw, 4rem)",
              textShadow: "0 0 30px rgba(212,175,55,0.15)",
            }}
          >
            25 de Julio, 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
}
