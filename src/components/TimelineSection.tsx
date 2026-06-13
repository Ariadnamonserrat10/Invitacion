"use client";

import { motion } from "framer-motion";
import { Church, PartyPopper } from "lucide-react";

interface Event { time: string; title: string; desc: string; icon: React.ReactNode; }

const events: Event[] = [
  {
    time: "10:00 AM", title: "Ceremonia Religiosa", desc: "Misa de acción de gracias en la Parroquia",
    icon: <Church size={22} strokeWidth={1.5} />,
  },
  {
    time: "2:00 PM", title: "Recepción", desc: "Llegada al salón de eventos y convivio",
    icon: <PartyPopper size={22} strokeWidth={1.5} />,
  },
];

export default function TimelineSection() {
  return (
    <section id="timeline" className="section-container relative">
      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-xs md:text-sm tracking-[0.4em] uppercase font-[var(--font-cinzel)]" style={{ color: "#3A5A7A" }}>
            Programa
          </p>
        </motion.div>

        <div className="flex flex-col gap-10">
          {events.map((ev, i) => (
            <motion.div key={ev.title}
              initial={{ opacity: 0, y: 40, rotateX: -5 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
              className="relative"
              style={{ perspective: "800px" }}
            >
              <motion.div
                className="rounded-2xl p-7 md:p-9 text-center relative overflow-hidden"
                style={{
                  border: "1px solid rgba(52,93,137,0.12)",
                  background: "linear-gradient(145deg, rgba(227,240,250,0.25), rgba(255,255,255,0.5), rgba(227,240,250,0.15))",
                  boxShadow: "0 4px 24px rgba(58,90,122,0.04), 0 1px 0 rgba(52,93,137,0.06) inset",
                }}
                whileHover={{
                  scale: 1.02,
                  borderColor: "rgba(52,93,137,0.3)",
                  boxShadow: "0 8px 40px rgba(58,90,122,0.08), 0 0 60px rgba(52,93,137,0.04)",
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Gold accent top */}
                <div className="absolute top-0 left-[15%] right-[15%] h-[2px]"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(52,93,137,0.2), transparent)" }} />

                <div className="flex items-center justify-center gap-4 mb-4">
                  <motion.div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, rgba(52,93,137,0.12), rgba(227,240,250,0.2))", border: "1px solid rgba(52,93,137,0.12)", color: "#3A5A7A" }}
                    whileHover={{ scale: 1.2, rotate: 5, borderColor: "rgba(52,93,137,0.3)" }}
                  >
                    {ev.icon}
                  </motion.div>

                  <div className="text-left flex-1">
                    <span className="text-[10px] tracking-[0.3em] font-[var(--font-cinzel)]" style={{ color: "rgba(52,93,137,0.6)" }}>
                      {ev.time}
                    </span>
                    <h3 className="text-base md:text-lg font-[var(--font-playfair)] font-semibold mt-1" style={{ color: "#1E3A5F" }}>
                      {ev.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm md:text-base font-[var(--font-poppins)] font-light leading-relaxed" style={{ color: "rgba(58,90,122,0.65)" }}>
                  {ev.desc}
                </p>

                {/* Gold accent bottom */}
                <div className="absolute bottom-0 left-[20%] right-[20%] h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(52,93,137,0.08), transparent)" }} />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
