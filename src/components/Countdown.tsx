import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Sparkles } from 'lucide-react';
import { useCountdown } from '../hooks/useCountdown';
import { invitationData } from '../data/invitation';
import { EASE_CINEMATIC } from '../utils/animation';

export const Countdown: React.FC = () => {
  const { days, hours, minutes, seconds, isCompleted, isToday } = useCountdown(
    invitationData.event.targetIsoDate
  );

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  const timeUnits = [
    { label: 'DAYS', value: formatNumber(days) },
    { label: 'HOURS', value: formatNumber(hours) },
    { label: 'MINUTES', value: formatNumber(minutes) },
    { label: 'SECONDS', value: formatNumber(seconds) },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 bg-[#1a1917] text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-champagne-gold/10 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE_CINEMATIC }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-champagne-gold/15 border border-champagne-gold/30 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-champagne-gold" />
            <span className="text-xs font-sans tracking-[0.25em] text-champagne-light uppercase font-semibold">
              Countdown To Celebration
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-wide text-ivory-100 mb-12">
            KHOẢNH KHẮC MANG TÍNH CỘT MỐC
          </h2>

          {isCompleted || isToday ? (
            <motion.div 
              initial={{ scale: 0.85, opacity: 0, filter: 'blur(10px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: EASE_CINEMATIC }}
              className="p-8 sm:p-12 rounded-2xl bg-champagne-gold/15 border border-champagne-gold/40 max-w-lg mx-auto shadow-2xl"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-champagne-gold/20 flex items-center justify-center border border-champagne-gold/50 animate-bounce">
                <GraduationCap className="w-9 h-9 text-champagne-gold" />
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-champagne-light mb-2">
                TODAY IS THE DAY!
              </h3>
              <p className="font-serif text-xl text-ivory-100 italic">
                HÔM NAY LÀ NGÀY TỐT NGHIỆP!
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
              {timeUnits.map((unit, idx) => (
                <motion.div
                  key={unit.label}
                  initial={{ opacity: 0, scale: 0.75, filter: 'blur(8px)' }}
                  whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: idx * 0.12,
                    ease: EASE_CINEMATIC,
                  }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-[#24221f] rounded-xl p-5 sm:p-7 border border-champagne-gold/25 shadow-lg flex flex-col items-center justify-center relative overflow-hidden group hover:border-champagne-gold/50 transition-colors"
                >
                  <span className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-champagne-gold tracking-tight mb-2">
                    {unit.value}
                  </span>
                  <span className="text-[11px] font-sans font-semibold tracking-[0.25em] text-ivory-300/70 uppercase">
                    {unit.label}
                  </span>
                  
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-champagne-gold/40 to-transparent" />
                </motion.div>
              ))}
            </div>
          )}

          <p className="text-xs font-sans tracking-widest text-ivory-300/60 uppercase mt-12">
            30/10/2026 · 14:55 · Trường Đại học Xây dựng Hà Nội
          </p>
        </motion.div>
      </div>
    </section>
  );
};
