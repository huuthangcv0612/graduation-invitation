// Centralized Motion Easing & Variants Config for Cinematic Experience
export const EASE_CINEMATIC = [0.22, 1, 0.36, 1] as const;
export const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;
export const EASE_ELEGANT = [0.25, 0.1, 0.25, 1] as const;
export const EASE_BOUNCE_SOFT = [0.34, 1.56, 0.64, 1] as const;

export const SPRING_SOFT = {
  stiffness: 80,
  damping: 18,
  mass: 0.6,
};

export const SPRING_SMOOTH = {
  stiffness: 120,
  damping: 22,
  mass: 0.5,
};

export const SPRING_BOUNCY = {
  stiffness: 220,
  damping: 16,
};

// Reusable Motion Variants
export const revealUp = {
  hidden: {
    opacity: 0,
    y: 35,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: EASE_CINEMATIC,
    },
  },
};

export const revealScale = {
  hidden: {
    opacity: 0,
    scale: 0.92,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: EASE_CINEMATIC,
    },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

export const staggerChild = {
  hidden: {
    opacity: 0,
    y: 25,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: EASE_CINEMATIC,
    },
  },
};

export const buttonHover = {
  hover: {
    scale: 1.025,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  tap: {
    scale: 0.97,
    transition: { duration: 0.1 },
  },
};

export const cardHover = {
  hover: {
    y: -5,
    transition: { duration: 0.3, ease: EASE_CINEMATIC },
  },
};
