import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Sparkles, Heart } from 'lucide-react';
import { invitationData } from '../../data/invitation';
import { useMousePosition } from '../../hooks/useMousePosition';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface EnvelopeProps {
  onOpen: () => void;
}

export const Envelope: React.FC<EnvelopeProps> = ({ onOpen }) => {
  // Step phases: 0: closed, 1: seal open, 2: flap open, 3: letter slide out, 4: letter expand, 5: fullscreen done
  const [step, setStep] = useState<number>(0);
  const [isClicking, setIsClicking] = useState<boolean>(false);

  const mouse = useMousePosition();
  const shouldReduceMotion = useReducedMotion();

  // Check sessionStorage on mount
  useEffect(() => {
    const hasOpened = sessionStorage.getItem('graduation_invitation_opened');
    if (hasOpened === 'true') {
      onOpen();
    }
  }, [onOpen]);

  // Calculate mouse tilt angles
  const mouseRotateX = mouse.isMobile || shouldReduceMotion ? 0 : -mouse.y * 12;
  const mouseRotateY = mouse.isMobile || shouldReduceMotion ? 0 : mouse.x * 12;
  const mouseTranslateZ = mouse.isMobile || shouldReduceMotion ? 0 : 15;

  const handleOpenClick = () => {
    if (isClicking || step > 0) return;
    setIsClicking(true);

    // STEP 1 & 2: Scale up envelope, crack wax seal (0ms)
    setStep(1);

    // STEP 3: Flap rotates X up 180deg (400ms)
    setTimeout(() => {
      setStep(2);
    }, 450);

    // STEP 4 & 5: Letter slides up out of envelope pocket (900ms)
    setTimeout(() => {
      setStep(3);
    }, 950);

    // STEP 6 & 7: Letter scales up & flattens rotate (1600ms)
    setTimeout(() => {
      setStep(4);
    }, 1600);

    // STEP 8, 9 & 10: Letter becomes fullscreen & triggers main site reveal (2200ms)
    setTimeout(() => {
      setStep(5);
      sessionStorage.setItem('graduation_invitation_opened', 'true');
      onOpen();
    }, 2350);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#131210] overflow-hidden px-4 select-none perspective-[1200px]">
      
      {/* Cinematic Ambient Golden Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-champagne-gold/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating Sparkles Ambient */}
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-champagne-gold"
            style={{
              width: (i % 3 + 2) + 'px',
              height: (i % 3 + 2) + 'px',
              top: ((i * 7) % 100) + '%',
              left: ((i * 13) % 100) + '%',
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 3.5 + (i % 4),
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i % 5) * 0.5,
            }}
          />
        ))}
      </div>

      {/* 3D Envelope Viewport Container */}
      <motion.div
        className="relative w-full max-w-[440px] aspect-[4/3] flex items-center justify-center"
        style={{
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateX: step > 0 ? 0 : mouseRotateX,
          rotateY: step > 0 ? 0 : mouseRotateY,
          translateZ: step > 0 ? 0 : mouseTranslateZ,
          scale: step === 1 ? 1.04 : 1,
          opacity: step === 5 ? 0 : 1,
        }}
        transition={{
          duration: step > 0 ? 0.6 : 0.2,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {/* Envelope 3D Shadow underneath */}
        <motion.div 
          className="absolute -bottom-8 left-6 right-6 h-8 bg-black/70 blur-xl rounded-full pointer-events-none"
          animate={{
            scale: step === 1 ? 1.15 : 1,
            opacity: step >= 4 ? 0 : 0.7,
          }}
          transition={{ duration: 0.5 }}
        />

        {/* ENVELOPE BODY CONTAINER */}
        <div 
          className="relative w-full h-full bg-[#24221d] rounded-2xl shadow-envelope border border-champagne-gold/30 p-6 flex flex-col justify-between overflow-hidden"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Golden Corner Accents */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-champagne-gold/50 z-30" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-champagne-gold/50 z-30" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-champagne-gold/50 z-30" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-champagne-gold/50 z-30" />

          {/* BACK PANEL */}
          <div className="absolute inset-0 bg-[#1e1c18] rounded-2xl z-0" />

          {/* LETTER CARD (Inside Envelope Pocket) */}
          <motion.div
            className="absolute inset-4 bg-ivory-50 rounded-xl p-6 border border-champagne-gold/40 shadow-xl flex flex-col items-center justify-center text-center z-10"
            initial={{ y: 0, scale: 1, zIndex: 10 }}
            animate={
              step === 0 ? { y: 0, scale: 1, zIndex: 10 } :
              step === 1 ? { y: -10, scale: 1, zIndex: 10 } :
              step === 2 ? { y: -40, scale: 1, zIndex: 25 } :
              step === 3 ? { y: -180, scale: 1.05, zIndex: 25 } :
              step === 4 ? { y: -260, scale: 1.25, zIndex: 35 } :
              { y: -300, scale: 2.5, opacity: 0, zIndex: 40 }
            }
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="mb-2">
              <Sparkles className="w-5 h-5 text-champagne-gold mx-auto animate-pulse" />
            </div>

            <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-charcoal/60 mb-2 font-medium">
              You Are Cordially Invited To My
            </span>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide text-charcoal mb-1 uppercase">
              GRADUATION DAY
            </h1>

            <p className="font-serif text-base text-champagne-dark italic mb-3">
              {invitationData.person.name}
            </p>

            <div className="w-10 h-[1px] bg-champagne-gold/40 my-2" />

            <p className="text-[11px] font-sans tracking-widest text-charcoal/70 uppercase font-semibold">
              {invitationData.event.date} · HUCE HANOI
            </p>
          </motion.div>

          {/* FRONT POCKET OVERLAY (V-shaped pocket) */}
          <div className="absolute inset-x-0 bottom-0 h-[60%] bg-[#292620] border-t border-champagne-gold/30 rounded-b-2xl z-20 shadow-md flex items-end justify-center pb-4">
            <div className="text-center px-4">
              <p className="text-[11px] font-serif italic text-champagne-light opacity-80">
                Thư mời lễ tốt nghiệp Kỹ sư Software Engineering
              </p>
            </div>
          </div>

          {/* TOP FLAP (Folds open 180deg) */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[52%] bg-[#2f2b24] border-b border-champagne-gold/40 z-30 origin-top shadow-lg flex items-end justify-center pb-3"
            style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
            initial={{ rotateX: 0 }}
            animate={{
              rotateX: step >= 2 ? -180 : 0,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Flap Wax Seal / Stamp Icon */}
            <motion.div
              className="w-11 h-11 rounded-full bg-champagne-gold/20 border-2 border-champagne-gold flex items-center justify-center shadow-md bg-[#2f2b24]"
              animate={{
                scale: step >= 1 ? [1, 1.2, 0] : 1,
                opacity: step >= 1 ? 0 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <Heart className="w-5 h-5 text-champagne-gold fill-champagne-gold/30" />
            </motion.div>
          </motion.div>

          {/* ACTION BUTTON (MỞ THƯ) */}
          <div className="absolute bottom-6 left-0 right-0 z-40 flex justify-center px-6">
            <AnimatePresence>
              {step === 0 && (
                <motion.button
                  initial={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenClick}
                  aria-label="Mở thư mời tốt nghiệp"
                  className="w-full max-w-[220px] py-3.5 px-6 rounded-full bg-champagne-gold hover:bg-champagne-dark text-charcoal font-sans font-semibold text-xs tracking-widest uppercase transition-colors duration-300 shadow-xl flex items-center justify-center gap-2 border border-champagne-light/50 cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>MỞ THƯ</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

        </div>
      </motion.div>

    </div>
  );
};
