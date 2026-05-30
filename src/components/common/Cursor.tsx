import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function Cursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[99999]"
        animate={{
          x: mousePos.x - 6,
          y: mousePos.y - 6,
          scale: isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? 'rgba(255,255,255,0.6)' : '#ffffff',
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-[36px] h-[36px] border border-white/40 rounded-full pointer-events-none z-[99998]"
        animate={{
          x: mousePos.x - 18,
          y: mousePos.y - 18,
          scale: isHovering ? 1.4 : 1,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200, mass: 0.8 }}
      />
    </>
  );
}
