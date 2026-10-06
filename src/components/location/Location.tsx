import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, ExternalLink, Compass } from 'lucide-react';
import { invitationData } from '../../data/invitation';
import { EASE_CINEMATIC } from '../../utils/animation';

export const Location: React.FC = () => {
  const { map, event } = invitationData;

  return (
    <section id="location" className="py-24 px-4 sm:px-6 bg-ivory-100 border-t border-champagne-gold/15">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center mb-14">
          <span className="text-xs font-sans tracking-[0.3em] uppercase text-champagne-dark font-semibold block mb-2">
            Venue & Map
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            HOW TO GET THERE
          </h2>
          <div className="w-12 h-[1px] bg-champagne-gold/40 mx-auto mt-4" />
        </div>

        {/* Location Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Information Card Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_CINEMATIC }}
            className="lg:col-span-5 bg-white p-7 sm:p-9 rounded-2xl border border-champagne-gold/25 shadow-invitation flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-full bg-ivory-100 border border-champagne-gold/30 flex items-center justify-center mb-6 shadow-sm">
                <Compass className="w-6 h-6 text-champagne-dark" />
              </div>

              <span className="text-xs font-sans font-semibold tracking-widest text-champagne-dark uppercase block mb-1">
                Địa điểm tổ chức
              </span>
              
              <h3 className="font-serif text-2xl font-bold text-charcoal mb-3">
                {event.location}
              </h3>

              <div className="flex items-start gap-3 text-charcoal/70 text-sm font-sans mb-6">
                <MapPin className="w-5 h-5 text-champagne-dark shrink-0 mt-0.5" />
                <p className="leading-relaxed">{event.address}</p>
              </div>

              <div className="p-4 rounded-xl bg-ivory-100/80 border border-champagne-gold/20 mb-8">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans font-semibold text-charcoal/70">Phòng Lễ Tốt Nghiệp:</span>
                  <span className="font-serif text-lg font-bold text-champagne-dark">{event.room}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs font-sans text-charcoal/60">Tòa nhà:</span>
                  <span className="text-xs font-sans font-medium text-charcoal">{event.building}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={map.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-full bg-champagne-gold hover:bg-champagne-dark text-charcoal hover:text-white text-xs font-sans font-semibold tracking-wider uppercase transition-colors duration-300 flex items-center justify-center gap-2 border border-champagne-gold/30 shadow-sm"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Mở Google Maps</span>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={map.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-full bg-charcoal hover:bg-charcoal-light text-ivory-100 text-xs font-sans font-semibold tracking-wider uppercase transition-colors duration-300 flex items-center justify-center gap-2 shadow-sm"
              >
                <Navigation className="w-4 h-4 text-champagne-gold" />
                <span>Chỉ đường</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Map Embed Column with Camera Zoom Entry */}
          <motion.div 
            initial={{ opacity: 0, scale: 1.12 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE_CINEMATIC }}
            className="lg:col-span-7 rounded-2xl overflow-hidden border border-champagne-gold/25 shadow-invitation bg-white min-h-[360px] relative"
          >
            <iframe
              title="HUCE Map Location"
              src={map.embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '360px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full filter contrast-105 opacity-95"
            />
          </motion.div>

        </div>

      </div>
    </section>
  );
};
