"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const galleryImages = [
  { id: 1, src: "/api/placeholder/600/800", alt: "Foto 1", title: "Magia" },
  { id: 2, src: "/api/placeholder/800/600", alt: "Foto 2", title: "Elegancia" },
  { id: 3, src: "/api/placeholder/600/800", alt: "Foto 3", title: "Felicidad" },
  { id: 4, src: "/api/placeholder/800/600", alt: "Foto 4", title: "Amor" },
  { id: 5, src: "/api/placeholder/600/800", alt: "Foto 5", title: "Sueños" },
  { id: 6, src: "/api/placeholder/800/600", alt: "Foto 6", title: "Familia" },
];

export default function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <section className="section-container relative">
      <div className="absolute inset-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(186,209,236,0.05) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[#A4BFDF] text-sm md:text-base tracking-[0.3em] uppercase font-[var(--font-cinzel)] mb-4">
            Galería
          </p>
          <h2 className="text-3xl md:text-5xl font-[var(--font-great-vibes)] text-[#E3F0FA]">
            Momentos Mágicos
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {galleryImages.map((image, i) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.03, zIndex: 10 }}
              className="cursor-pointer rounded-xl overflow-hidden glass-card group"
              onClick={() => openLightbox(i)}
            >
              <div className="relative aspect-[3/4] md:aspect-auto md:h-64 lg:h-80 overflow-hidden">
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a]/60 to-transparent z-10"
                />
                <div
                  className="w-full h-full bg-gradient-to-br from-[#BAD1EC]/20 to-[#89AAD7]/10 flex items-center justify-center"
                >
                  <div className="text-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#BAD1EC" strokeWidth="1" className="w-12 h-12 mx-auto mb-2 opacity-50">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="m21 15-5-5L5 21" />
                    </svg>
                    <span className="text-[#A4BFDF] text-xs font-[var(--font-poppins)] opacity-60">
                      {image.title}
                    </span>
                  </div>
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a]/80 via-transparent to-transparent z-20 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <span className="text-[#E3F0FA] text-sm font-[var(--font-playfair)]">
                    {image.title}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm"
              onClick={closeLightbox}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-3xl w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden glass-card">
                  <div className="w-full h-full bg-gradient-to-br from-[#BAD1EC]/20 to-[#89AAD7]/10 flex items-center justify-center">
                    <div className="text-center">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#BAD1EC" strokeWidth="1" className="w-24 h-24 mx-auto mb-4 opacity-30">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="m21 15-5-5L5 21" />
                      </svg>
                      <p className="text-[#BAD1EC] font-[var(--font-playfair)] text-lg">
                        {galleryImages[currentIndex].title}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Nav buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-light flex items-center justify-center text-[#BAD1EC] hover:bg-[rgba(227,240,250,0.2)] transition-all"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-light flex items-center justify-center text-[#BAD1EC] hover:bg-[rgba(227,240,250,0.2)] transition-all"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>

                {/* Close */}
                <button
                  onClick={closeLightbox}
                  className="absolute -top-12 right-0 text-[#BAD1EC] hover:text-[#E3F0FA] transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>

                {/* Counter */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[#A4BFDF] text-sm font-[var(--font-poppins)]">
                  {currentIndex + 1} / {galleryImages.length}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
