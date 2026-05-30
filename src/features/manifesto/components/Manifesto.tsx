import { motion } from 'motion/react';

export function Manifesto() {
  return (
    <div className="py-40 px-6 md:px-12 flex items-center justify-center relative overflow-hidden border-y border-white/[0.06]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-clash text-[clamp(8rem,20vw,18rem)] font-bold tracking-[-0.05em] pointer-events-none whitespace-nowrap z-0 text-white/[0.02]">
        MOVEMENT
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-[900px] text-center relative z-10"
      >
        <span className="font-clash text-[4rem] text-white/10 leading-[0.5] block mb-8">"</span>
        <blockquote className="font-clash text-[clamp(2rem,4.5vw,3.5rem)] font-semibold tracking-[-0.03em] leading-[1.1] text-white">
          More than music.<br />
          <em className="italic not-italic text-white/30">A movement</em> built on<br />
          brotherhood, passion,<br />
          and purpose.
        </blockquote>
        <div className="mt-12 flex items-center justify-center gap-4 font-sans text-[0.7rem] tracking-[0.2em] uppercase text-white/20">
          <div className="w-10 h-[1px] bg-white/15" />
          W.T.G.N
          <div className="w-10 h-[1px] bg-white/15" />
        </div>
      </motion.div>
    </div>
  );
}
