"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Sparkles from "./Sparkles";

const parents = [
  { name: "Sarahi Aparicio Gomez", role: "Mamá", desc: "Con amor y dedicación", isMemorial: false },
  { name: "Jose Carlos Velasco España", role: "Papá", desc: "Con amor eterno", isMemorial: true },
];

const godparents = [
  { name: "Leticia Aparicio Velasco", role: "Madrina", desc: "Con cariño y bendiciones", isMemorial: false },
  { name: "Mauricio Garnica", role: "Padrino", desc: "Con orgullo y alegría", isMemorial: false },
];

function PersonCard({ name, role, desc, index, isMemorial, variant }: {
  name: string; role: string; desc: string; index: number; isMemorial: boolean; variant: "parent" | "godparent";
}) {
  const [particles, setParticles] = useState<{ left: string; delay: number }[]>([]);

  useEffect(() => {
    if (isMemorial) {
      setParticles(
        Array.from({ length: 6 }, (_, i) => ({
          left: `${20 + Math.random() * 60}%`,
          delay: i * 0.5,
        }))
      );
    }
  }, [isMemorial]);

  const animations = [
    { initial: { opacity: 0, x: -40 } },
    { initial: { opacity: 0, y: 40, scale: 0.9 } },
    { initial: { opacity: 0, rotate: -3 } },
    { initial: { opacity: 0, x: 40 } },
  ];
  const anim = animations[index % animations.length];

  const isParent = variant === "parent";

  const bgDark = "linear-gradient(135deg, rgba(20,45,75,0.12), rgba(30,58,95,0.08))";
  const bgLight = "linear-gradient(135deg, rgba(30,58,95,0.06), rgba(58,90,122,0.03))";

  return (
    <motion.div
      {...anim}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
      viewport={{ margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.12 }}
      className="rounded-2xl p-8 md:p-10 text-center relative overflow-hidden mx-auto w-full"
      style={{
        border: isMemorial ? "1.5px solid rgba(212,175,55,0.35)" : isParent ? "1px solid rgba(20,45,75,0.2)" : "1px solid rgba(58,90,122,0.12)",
        maxWidth: 400,
        background: isMemorial
          ? "linear-gradient(135deg, rgba(227,240,250,0.12), rgba(212,175,55,0.06), rgba(227,240,250,0.1))"
          : isParent ? bgDark : bgLight,
        boxShadow: isMemorial
          ? "0 0 30px rgba(212,175,55,0.08), 0 0 60px rgba(227,240,250,0.06)"
          : isParent
            ? "0 0 20px rgba(20,45,75,0.06)"
            : "0 0 15px rgba(58,90,122,0.04)",
      }}
      whileHover={{ scale: 1.04, borderColor: isMemorial ? "rgba(212,175,55,0.5)" : isParent ? "rgba(20,45,75,0.35)" : "rgba(58,90,122,0.25)", boxShadow: isMemorial ? "0 0 50px rgba(212,175,55,0.15)" : "0 0 30px rgba(58,90,122,0.08)", transition: { duration: 0.3 } }}
    >
      {isMemorial && (
        <>
          <motion.div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.08) 0%, transparent 70%)" }}
            animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
          {particles.map((p, i) => (
            <motion.div key={`mp-${i}`} className="absolute w-1 h-1 rounded-full"
              style={{ background: "#D4AF37", left: p.left }}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: [0, -50 - (i % 3) * 15], opacity: [0, 0.5, 0] }}
              transition={{ duration: 3 + (i % 3), delay: p.delay, repeat: Infinity, ease: "easeOut" }} />
          ))}
        </>
      )}

      <div className="relative z-10">
        <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase font-[var(--font-cinzel)] mb-3" style={{ color: isParent ? "rgba(20,45,75,0.55)" : "rgba(58,90,122,0.5)" }}>
          {role}
        </p>
        <h3 className="text-lg md:text-xl font-[var(--font-playfair)] font-semibold" style={{ color: isParent ? "#1E3A5F" : "rgba(30,58,95,0.75)" }}>
          {isMemorial && (
            <motion.span className="inline-block mr-2 text-xl md:text-2xl"
              style={{ color: "#D4AF37" }}
              animate={{
                textShadow: ["0 0 6px rgba(212,175,55,0.4)", "0 0 18px rgba(212,175,55,0.8)", "0 0 6px rgba(212,175,55,0.4)"],
                scale: [1, 1.15, 1],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
              ✝
            </motion.span>
          )}
          {name}
        </h3>
        <p className="text-xs md:text-sm font-[var(--font-poppins)] font-light mt-2" style={{ color: isParent ? "rgba(30,58,95,0.5)" : "rgba(58,90,122,0.6)" }}>{desc}</p>
        {isMemorial && (
          <motion.p className="text-[10px] mt-3 font-[var(--font-playfair)] italic"
            style={{ color: "rgba(212,175,55,0.6)" }}
            animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
            Siempre en nuestro corazón
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

export default function ParentsSection() {
  return (
    <section id="parents" className="section-container relative">
      <Sparkles count={14} />
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ margin: "-80px" }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-[var(--font-great-vibes)]" style={{ color: "#1E3A5F", textShadow: "0 0 30px rgba(227,240,250,0.3)" }}>Padres y Padrinos</h2>
        </motion.div>

        <div className="mb-24">
          <p className="text-center text-[10px] tracking-[0.3em] uppercase font-[var(--font-cinzel)] mb-10" style={{ color: "rgba(58,90,122,0.45)" }}>— Padres —</p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20 max-w-4xl mx-auto">
            {parents.map((p, i) => <PersonCard key={p.name} {...p} index={i} variant="parent" />)}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ margin: "-80px" }} transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-3 my-16">
          <span className="h-px w-12" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.2))" }} />
          <span className="font-[var(--font-playfair)] italic text-sm" style={{ color: "rgba(212,175,55,0.3)" }}>✧</span>
          <span className="h-px w-12" style={{ background: "linear-gradient(270deg, transparent, rgba(212,175,55,0.2))" }} />
        </motion.div>

        <div>
          <p className="text-center text-[10px] tracking-[0.3em] uppercase font-[var(--font-cinzel)] mb-10" style={{ color: "rgba(58,90,122,0.45)" }}>— Padrinos —</p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20 max-w-4xl mx-auto">
            {godparents.map((p, i) => <PersonCard key={p.name} {...p} index={i + 2} variant="godparent" />)}
          </div>
        </div>
      </div>
    </section>
  );
}
