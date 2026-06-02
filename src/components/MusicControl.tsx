"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getAudio, playAudio, pauseAudio, isAudioPlaying } from "@/lib/audio";

export default function MusicControl() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControl, setShowControl] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowControl(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const check = setInterval(() => setIsPlaying(isAudioPlaying()), 1000);
    return () => clearInterval(check);
  }, []);

  const togglePlay = () => {
    if (isAudioPlaying()) {
      pauseAudio();
      setIsPlaying(false);
    } else {
      playAudio().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: showControl ? 1 : 0, x: showControl ? 0 : 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed bottom-6 right-6 z-50"
    >
      <motion.button
        onClick={togglePlay}
        whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(227,240,250,0.3)" }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          background: "rgba(227,240,250,0.15)",
          border: "1px solid rgba(227,240,250,0.2)",
          color: "#E3F0FA",
          boxShadow: "0 0 20px rgba(227,240,250,0.15)",
          backdropFilter: "blur(12px)",
        }}
        title={isPlaying ? "Pausar" : "Reproducir"}
      >
        {isPlaying ? (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </motion.button>

      {isPlaying && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-end gap-[3px]"
        >
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-[1.5px] rounded-full"
              style={{ background: "#C3E0F4" }}
              animate={{ height: [4, 12 + i * 3, 6, 14 + i * 2, 4] }}
              transition={{
                duration: 0.8 + i * 0.15,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.15,
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
