"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Sparkle { id: number; x: number; y: number; size: number; delay: number; shape: "star" | "diamond" | "circle" | "cross"; }

export default function GoldSparkles({ count = 10, className = "" }: { count?: number; className?: string }) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const s = Array.from({ length: count }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 5 + 3, delay: Math.random() * 3,
      shape: (["star", "diamond", "circle", "cross"] as const)[Math.floor(Math.random() * 4)],
    }));
    setSparkles(s);
    const interval = setInterval(() => {
      setSparkles(prev => prev.map(sp => ({
        ...sp, x: Math.random() * 100, y: Math.random() * 100,
        delay: Math.random() * 2, size: Math.random() * 5 + 3,
        shape: (["star", "diamond", "circle", "cross"] as const)[Math.floor(Math.random() * 4)],
      })));
    }, 5000);
    return () => clearInterval(interval);
  }, [count]);

  const renderShape = (shape: string, size: number) => {
    const s = size;
    const gold = "#D4AF37";
    const goldLight = "#F0D68A";
    switch (shape) {
      case "star":
        return <svg width={s * 2} height={s * 2} viewBox="0 0 24 24" fill="none"><path d="M12 2l2.5 6.5L21 9l-5 4.5 1.5 7L12 16.5 6.5 20.5 8 13.5 3 9l6.5-0.5z" fill={gold} opacity={0.7} stroke={goldLight} strokeWidth="0.5" /></svg>;
      case "diamond":
        return <svg width={s * 2} height={s * 2} viewBox="0 0 24 24" fill="none"><rect x="7" y="7" width="10" height="10" rx="1" transform="rotate(45 12 12)" fill={gold} opacity={0.6} stroke={goldLight} strokeWidth="0.5" /></svg>;
      case "cross":
        return <svg width={s * 2} height={s * 2} viewBox="0 0 24 24" fill="none"><path d="M12 4v16M4 12h16" stroke={gold} strokeWidth="2" strokeLinecap="round" opacity={0.6} /><circle cx="12" cy="12" r="2" fill={goldLight} opacity={0.4} /></svg>;
      default:
        return <svg width={s * 2} height={s * 2} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="5" fill={gold} opacity={0.5} stroke={goldLight} strokeWidth="0.5" /></svg>;
    }
  };

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <AnimatePresence>
        {sparkles.map(sp => (
          <motion.div key={sp.id} className="absolute" style={{ left: `${sp.x}%`, top: `${sp.y}%` }}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{ opacity: [0, 1, 0.6, 0], scale: [0, 1.3, 0.9, 0], rotate: [0, 180, 360] }}
            transition={{ duration: 3, delay: sp.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            {renderShape(sp.shape, sp.size)}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
