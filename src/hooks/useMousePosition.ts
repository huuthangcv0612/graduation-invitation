import { useState, useEffect } from 'react';

export interface MousePosition {
  x: number; // -1 to 1
  y: number; // -1 to 1
  isMobile: boolean;
}

export const useMousePosition = (): MousePosition => {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    isMobile: false,
  });

  useEffect(() => {
    const checkMobile = () => window.innerWidth < 768;

    const handleMouseMove = (e: MouseEvent) => {
      if (checkMobile()) return;

      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;

      setPosition({
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y)),
        isMobile: false,
      });
    };

    const handleResize = () => {
      const mobile = checkMobile();
      if (mobile) {
        setPosition({ x: 0, y: 0, isMobile: true });
      }
    };

    handleResize();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return position;
};
