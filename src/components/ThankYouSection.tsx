"use client";

import { motion } from "framer-motion";
import Sparkles from "./Sparkles";

export default function ThankYouSection() {
  return (
    <section id="thanks" className="section-container relative">
      <Sparkles count={22} />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.h2 initial={{ opacity: 0, y: -20, scale: 0.8 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ margin: "-80px" }} transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-[var(--font-great-vibes)] mb-10"
          style={{ color: "#1E3A5F", textShadow: "0 0 40px rgba(227,240,250,0.4)" }}>Gracias</motion.h2>

        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ margin: "-80px" }} transition={{ duration: 1.2, delay: 0.2 }}
          className="h-px w-32 mx-auto mb-10" style={{ background: "linear-gradient(90deg, transparent, rgba(195,224,244,0.5), transparent)" }} />

        <motion.p initial={{ opacity: 0, y: 30, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ margin: "-80px" }} transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          className="text-base md:text-lg leading-relaxed md:leading-8 font-[var(--font-poppins)] font-light mb-8" style={{ color: "rgba(30,58,95,0.75)" }}>
          Gracias por ser parte de este día tan especial. Tu presencia, tu cariño y tu amor hacen que este momento sea verdaderamente mágico e inolvidable.
        </motion.p>

        <motion.p initial={{ opacity: 0, y: 30, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ margin: "-80px" }} transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
          className="text-base md:text-lg leading-relaxed md:leading-8 font-[var(--font-poppins)] font-light mb-14" style={{ color: "rgba(30,58,95,0.6)" }}>
          Cada sonrisa compartida, cada abrazo y cada momento vivido serán atesorados en mi corazón por siempre. Gracias por acompañarme en este sueño hecho realidad.
        </motion.p>

        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ margin: "-80px" }} transition={{ duration: 1.2, delay: 0.7 }}
          className="h-px w-24 mx-auto mb-10" style={{ background: "linear-gradient(90deg, transparent, rgba(227,240,250,0.4), transparent)" }} />

        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ margin: "-80px" }} transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
          className="text-sm md:text-base font-[var(--font-poppins)]" style={{ color: "rgba(58,90,122,0.6)" }}>
          Con todo mi cariño, <span className="font-[var(--font-great-vibes)] text-xl md:text-2xl" style={{ color: "#1E3A5F" }}>Suri Michelle</span>
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ margin: "-80px" }} transition={{ duration: 0.8, delay: 1.1 }} className="mt-12">
          <div className="flex justify-center gap-2">
            {["✦", "✧", "✦", "✧", "✦"].map((s, i) => (
              <motion.span key={i} className="text-xs" style={{ color: "rgba(195,224,244,0.3)" }}
                animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}>
                {s}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
