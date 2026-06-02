"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Sparkle { id: number; x: number; y: number; size: number; delay: number; shape: "star" | "diamond" | "circle" | "cross"; }

export default function Sparkles({ count = 12, className = "" }: { count?: number; className?: string }) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const s = Array.from({ length: count }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 4 + 2, delay: Math.random() * 2.5,
      shape: (["star", "diamond", "circle", "cross"] as const)[Math.floor(Math.random() * 4)],
    }));
    setSparkles(s);
    const interval = setInterval(() => {
      setSparkles(prev => prev.map(sp => ({ ...sp, x: Math.random() * 100, y: Math.random() * 100, delay: Math.random() * 2 })));
    }, 4000);
    return () => clearInterval(interval);
  }, [count]);

  const renderShape = (shape: string, size: number, color: string) => {
    const s = size;
    switch (shape) {
      case "star":
        return <svg width={s * 2} height={s * 2} viewBox="0 0 24 24" fill="none"><path d="M12 0L14 10L22 12L14 14L12 24L10 14L2 12L10 10Z" fill={color} opacity={0.8} /></svg>;
      case "diamond":
        return <svg width={s * 2} height={s * 2} viewBox="0 0 24 24" fill="none"><rect x="7" y="7" width="10" height="10" rx="1" transform="rotate(45 12 12)" fill={color} opacity={0.6} /></svg>;
      case "cross":
        return <svg width={s * 2} height={s * 2} viewBox="0 0 24 24" fill="none"><path d="M12 4v16M4 12h16" stroke={color} strokeWidth="2" strokeLinecap="round" opacity={0.6} /></svg>;
      default:
        return <svg width={s * 2} height={s * 2} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4" fill={color} opacity={0.5} /></svg>;
    }
  };

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <AnimatePresence>
        {sparkles.map(sp => (
          <motion.div key={sp.id} className="absolute" style={{ left: `${sp.x}%`, top: `${sp.y}%` }}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{ opacity: [0, 1, 0.7, 0], scale: [0, 1.2, 0.8, 0], rotate: [0, 180, 360] }}
            transition={{ duration: 2.5, delay: sp.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            {renderShape(sp.shape, sp.size, "#E3F0FA")}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
