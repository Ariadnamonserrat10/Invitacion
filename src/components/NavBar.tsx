"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Inicio", href: "#top" },
  { label: "Bienvenida", href: "#welcome" },
  { label: "Cuenta", href: "#countdown" },
  { label: "Familia", href: "#parents" },
  { label: "Invitación", href: "#invitation" },
  { label: "Programa", href: "#timeline" },
  { label: "Ubicación", href: "#location" },
  { label: "Gracias", href: "#thanks" },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      const ids = navItems.map(i => i.href.slice(1));
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 200) { setActive(ids[i]); break; }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: scrolled ? 0 : -80 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div style={{
          background: scrolled ? "rgba(237,243,250,0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(227,240,250,0.25)" : "1px solid transparent",
          transition: "all 0.4s ease",
        }}>
          <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-xl font-[var(--font-great-vibes)]" style={{ color: "#1E3A5F" }}>
              ✦ S
            </button>

            <div className="hidden md:flex items-center justify-center gap-4 lg:gap-5">
              {navItems.map(item => {
                const isActive = active === item.href.slice(1);
                return (
                  <button key={item.href} onClick={() => scrollTo(item.href)}
                    className="relative text-[10px] lg:text-[11px] tracking-[0.15em] uppercase font-[var(--font-poppins)] transition-all duration-300 px-1"
                    style={{ color: isActive ? "#1E3A5F" : "rgba(58,90,122,0.5)", fontWeight: isActive ? 500 : 300 }}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div layoutId="navIndicator"
                        className="absolute -bottom-[3px] left-1 right-0 h-[2px] rounded-full"
                        style={{ background: "#C3E0F4" }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2" style={{ color: "#1E3A5F" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                {isOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <><path d="M3 12h18M3 6h18M3 18h18" /></>}
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden">
            <div className="absolute inset-0" style={{ background: "rgba(237,243,250,0.98)" }} onClick={() => setIsOpen(false)} />
            <div className="relative z-10 flex flex-col items-center justify-center h-full gap-6">
              {navItems.map((item, i) => (
                <motion.button key={item.href}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                  onClick={() => scrollTo(item.href)}
                  className="text-base tracking-[0.25em] uppercase font-[var(--font-poppins)]"
                  style={{ color: "#1E3A5F" }}
                  whileHover={{ scale: 1.05 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
