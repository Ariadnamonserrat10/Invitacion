"use client";

import { motion } from "framer-motion";
import Sparkles from "./Sparkles";

export default function WelcomeSection() {
  return (
    <section id="welcome" className="section-container relative">
      <Sparkles count={18} />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="text-xs md:text-sm tracking-[0.4em] uppercase font-[var(--font-cinzel)] mb-10"
          style={{ color: "#3A5A7A" }}
        >
          — Una historia mágica —
        </motion.p>

        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ margin: "-80px" }} transition={{ duration: 1.2, delay: 0.2, ease: "easeInOut" }}
          className="h-px w-28 mx-auto mb-12" style={{ background: "linear-gradient(90deg, transparent, rgba(52,93,137,0.2), transparent)" }} />

        <motion.p initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ margin: "-80px" }} transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="text-base md:text-lg leading-relaxed md:leading-8 font-[var(--font-poppins)] font-light mb-8"
          style={{ color: "rgba(30,58,95,0.78)" }}>
          Hace quince años comenzó esta hermosa historia, llena de aprendizajes, sueños y sonrisas, construida con momentos inolvidables que han marcado mi vida y mi corazón.
        </motion.p>

        <motion.p initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ margin: "-80px" }} transition={{ duration: 1, delay: 0.55, ease: "easeOut" }}
          className="text-base md:text-lg leading-relaxed md:leading-8 font-[var(--font-poppins)] font-light"
          style={{ color: "rgba(30,58,95,0.78)" }}>
          Hoy doy un paso muy importante hacia una nueva etapa, llena de ilusiones, metas y nuevos sueños por cumplir.
        </motion.p>

        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ margin: "-80px" }} transition={{ duration: 1.2, delay: 0.8 }}
          className="h-px w-20 mx-auto mt-12" style={{ background: "linear-gradient(90deg, transparent, rgba(195,224,244,0.4), transparent)" }} />
      </div>
    </section>
  );
}
