import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles } from 'lucide-react';
import { GalleryItem } from '../../data/invitation';
import { EASE_CINEMATIC } from '../../utils/animation';

interface LightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ item, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (item) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-pointer select-none"
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: EASE_CINEMATIC }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#1c1a17] rounded-2xl border border-champagne-gold/30 shadow-2xl overflow-hidden cursor-default flex flex-col items-center"
          >
            <button
              onClick={onClose}
              aria-label="Đóng ảnh"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-champagne-gold hover:text-charcoal border border-champagne-gold/30 transition-all flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full max-h-[75vh] flex items-center justify-center bg-black/40 overflow-hidden p-2 sm:p-4">
              <motion.img
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, ease: EASE_CINEMATIC }}
                src={item.src}
                alt={item.alt}
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg shadow-lg"
              />
            </div>

            <div className="w-full p-5 sm:p-6 bg-[#25221d] border-t border-champagne-gold/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
              <div>
                <p className="font-serif text-lg sm:text-xl font-semibold text-champagne-light mb-1">
                  {item.caption}
                </p>
                <p className="text-xs font-sans text-ivory-300/60 uppercase tracking-widest">
                  {item.alt}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-champagne-gold font-sans font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Memories Collection</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
