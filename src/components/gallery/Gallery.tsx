import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ZoomIn } from 'lucide-react';
import { invitationData, GalleryItem } from '../../data/invitation';
import { Lightbox } from './Lightbox';
import { EASE_CINEMATIC } from '../../utils/animation';

export const Gallery: React.FC = () => {
  const { gallery } = invitationData;
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Subtle photo angles like photos laid on a table (-2deg, 1deg, -1deg, 2deg, -1.5deg, 1.5deg)
  const rotations = [-2, 1, -1.5, 2, -1, 1.5];

  return (
    <section id="memories" className="py-24 px-4 sm:px-6 bg-ivory-50 border-t border-champagne-gold/15">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-sans tracking-[0.3em] uppercase text-champagne-dark font-semibold block mb-2">
            Photo Album
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            MEMORIES
          </h2>
          <p className="text-xs sm:text-sm font-sans text-charcoal/60 mt-2">
            Những khoảnh khắc đẹp trong suốt quãng thời gian sinh viên
          </p>
          <div className="w-12 h-[1px] bg-champagne-gold/40 mx-auto mt-4" />
        </div>

        {/* Gallery Grid (Mobile 2 Columns, Desktop 3 Columns) */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {gallery.map((item, index) => {
            const rot = rotations[index % rotations.length];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9, y: 30, rotate: rot }}
                whileInView={{ opacity: 1, scale: 1, y: 0, rotate: rot }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: EASE_CINEMATIC }}
                whileHover={{ scale: 1.04, rotate: 0, zIndex: 20, transition: { duration: 0.3 } }}
                onClick={() => setSelectedItem(item)}
                aria-label={`Xem ảnh: ${item.caption}`}
                className="group relative cursor-pointer overflow-hidden rounded-xl bg-charcoal aspect-[4/5] border border-champagne-gold/20 shadow-md hover:shadow-2xl transition-all duration-300"
              >
                {/* Image Container */}
                <div className="w-full h-full overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  />
                </div>

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Hover Zoom Badge */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 shadow-sm">
                  <ZoomIn className="w-4 h-4" />
                </div>

                {/* Caption Subtext */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-serif text-sm sm:text-base font-semibold text-white drop-shadow-md line-clamp-2">
                    {item.caption}
                  </p>
                  <span className="text-[10px] font-sans tracking-widest uppercase text-champagne-gold font-medium block mt-1">
                    Nhấp để mở rộng
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal */}
      <Lightbox
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </section>
  );
};
