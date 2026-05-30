import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <section ref={ref} id="home" className="relative min-h-screen flex flex-col justify-end px-6 md:px-12 pb-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_70%_40%,rgba(255,255,255,0.04)_0%,transparent_70%)] z-10" />
        <motion.img 
          src="/images/WTGN_banner-1.jpeg" 
          alt="Studio background" 
          className="w-full h-[130%] -top-[15%] absolute object-cover opacity-40 grayscale"
          style={{ y: bgY }}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg_viewBox=%220_0_256_256%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22noise%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.9%22_numOctaves=%224%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23noise)%22/%3E%3C/svg%3E')] z-10" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:80px_80px] z-10" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-1/2 left-6 md:left-12 -translate-y-[70%] glass-card px-6 py-5 min-w-[220px] z-20 hidden lg:block"
      >
        <span className="block font-sans text-[0.6rem] tracking-[0.2em] uppercase text-white/40 mb-2">// Currently Active</span>
        <h4 className="text-[1.05rem] text-white font-medium">South African Duo</h4>
        <p className="font-sans text-[0.72rem] text-white/45 mt-1 font-light">Johannesburg · SAE Institute Alumni</p>
      </motion.div>

      <span className="absolute top-1/2 right-6 md:right-12 -translate-y-1/2 [writing-mode:vertical-lr] text-[0.65rem] tracking-[0.25em] text-white/25 uppercase z-20 hidden md:block select-none">
        Raw Sound — Real Stories — Global Vision
      </span>

      <div className="relative z-20 w-full max-w-[1400px]">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-4 mb-6 font-sans text-[0.7rem] tracking-[0.25em] uppercase text-white/35"
        >
          <span className="w-8 h-[1px] bg-white/30" />
          <span>// W.T.G.N</span>
          <span>What The Game Needs</span>
        </motion.div>

        <motion.h1 style={{ y: textY }} className="text-[clamp(3.5rem,10vw,8.5rem)] font-bold leading-[0.88] tracking-[-0.04em] mb-12 relative z-20">
          {['WHAT', 'THE', 'GAME'].map((line, i) => (
            <motion.span key={line} className="block overflow-hidden">
              <motion.span
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 + (i * 0.15), duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className={`block ${i === 2 ? 'text-white/15' : 'text-white'}`}
              >
                {line}
              </motion.span>
            </motion.span>
          ))}
          <motion.span className="block overflow-hidden">
            <motion.span 
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="block text-white"
            >
              NEEDS
            </motion.span>
          </motion.span>
        </motion.h1>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-12">
          <p className="max-w-[340px] font-sans text-[0.85rem] leading-[1.65] text-white/35 uppercase tracking-[0.04em] font-light">
            Raw Sound — Authentic Vibes —<br />South Africa's Rising Music Movement
          </p>
          
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4"
          >
            <a href="#music" className="bg-white text-black px-[2.2rem] py-[0.9rem] font-space text-[0.78rem] font-semibold tracking-[0.1em] uppercase border border-white hover:bg-transparent hover:text-white transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2">
              Listen to the Movement <span>↓</span>
            </a>
            <a href="#about" className="bg-transparent text-white/60 px-[2.2rem] py-[0.9rem] font-space text-[0.78rem] font-medium tracking-[0.1em] uppercase border border-white/20 hover:border-white hover:text-white transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2">
              Our Story <span>→</span>
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-[2.5rem] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-white/25">Scroll</span>
        <div className="w-[1px] h-[48px] bg-gradient-to-b from-white/40 to-transparent animate-[scrollPulse_2s_ease_infinite]" />
      </motion.div>
    </section>
  );
}
