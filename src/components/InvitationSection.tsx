"use client";

import { motion } from "framer-motion";
import Sparkles from "./Sparkles";

export default function InvitationSection() {
  return (
    <section id="invitation" className="section-container relative">
      <Sparkles count={20} />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.p initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ margin: "-80px" }} transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="text-base md:text-lg leading-relaxed md:leading-8 font-[var(--font-poppins)] font-light mb-8"
          style={{ color: "rgba(30,58,95,0.78)" }}>
          Con la bendición de Dios, el amor de mi familia y el cariño de quienes han formado parte de mi camino,
        </motion.p>

        <motion.p initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ margin: "-80px" }} transition={{ duration: 1, delay: 0.55, ease: "easeOut" }}
          className="text-base md:text-lg leading-relaxed md:leading-8 font-[var(--font-poppins)] font-light mb-10"
          style={{ color: "rgba(30,58,95,0.78)" }}>
          quiero{' '}
          <span className="font-[var(--font-great-vibes)] text-xl md:text-2xl lg:text-3xl"
            style={{
              color: "#345D89",
              textShadow: "0 0 20px rgba(52,93,137,0.3)",
            }}>
            invitarte a celebrar conmigo mis XV años
          </span>
        </motion.p>

        <motion.p initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ margin: "-80px" }} transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="text-base md:text-lg leading-relaxed md:leading-8 font-[var(--font-poppins)] font-light"
          style={{ color: "rgba(30,58,95,0.78)" }}>
          y compartir este día mágico lleno de emociones, alegría, amor y felicidad.
        </motion.p>

        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ margin: "-80px" }} transition={{ duration: 1.2, delay: 1.2 }}
          className="h-px w-20 mx-auto mt-12" style={{ background: "linear-gradient(90deg, transparent, rgba(195,224,244,0.4), transparent)" }} />
      </div>
    </section>
  );
}
