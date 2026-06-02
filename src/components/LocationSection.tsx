"use client";

import { motion } from "framer-motion";
import { MapPin, ExternalLink } from "lucide-react";

export default function LocationSection() {
  return (
    <section id="location" className="section-container relative">
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-xs md:text-sm tracking-[0.4em] uppercase font-[var(--font-cinzel)]" style={{ color: "#3A5A7A" }}>
            Ubicación
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: "Ceremonia Religiosa", place: "Parroquia de Nuestra Señora", addr: "Av. Principal #123, Centro", url: "https://maps.google.com" },
            { title: "Recepción", place: "Salón de Eventos Los Ángeles", addr: "Blvd. de las Flores #456, Col. Centro", url: "https://maps.google.com" },
          ].map((loc, i) => (
            <motion.div key={loc.title}
              initial={{ opacity: 0, scale: 0.9, rotateY: i === 0 ? -8 : 8 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
              style={{ perspective: "800px" }}
              className="rounded-2xl p-8 text-center relative overflow-hidden"
            >
              <motion.div
                className="relative"
                style={{
                  border: "1px solid rgba(212,175,55,0.1)",
                  background: "linear-gradient(160deg, rgba(227,240,250,0.15), rgba(212,175,55,0.03), rgba(227,240,250,0.1))",
                  borderRadius: "1rem",
                  padding: "2rem",
                  boxShadow: "0 4px 20px rgba(58,90,122,0.03), 0 0 40px rgba(212,175,55,0.02)",
                }}
                whileHover={{
                  scale: 1.03,
                  borderColor: "rgba(212,175,55,0.25)",
                  boxShadow: "0 8px 40px rgba(58,90,122,0.06), 0 0 60px rgba(212,175,55,0.04)",
                  transition: { duration: 0.3 },
                }}
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.1), rgba(227,240,250,0.15))", border: "1px solid rgba(212,175,55,0.1)", boxShadow: "0 0 15px rgba(212,175,55,0.04)" }}>
                  <MapPin size={20} strokeWidth={1.5} style={{ color: "#3A5A7A" }} />
                </div>
                <h3 className="text-base md:text-lg font-[var(--font-playfair)] font-semibold mb-2" style={{ color: "#1E3A5F" }}>{loc.title}</h3>
                <p className="text-sm font-[var(--font-poppins)] font-light" style={{ color: "rgba(58,90,122,0.7)" }}>{loc.place}</p>
                <p className="text-xs font-[var(--font-poppins)] mt-2 mb-5" style={{ color: "rgba(58,90,122,0.5)" }}>{loc.addr}</p>
                <motion.a href={loc.url} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-[var(--font-poppins)] transition-all"
                  style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.12)", color: "#1E3A5F" }}>
                  <ExternalLink size={14} strokeWidth={2} />
                  Ver en Google Maps
                </motion.a>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
