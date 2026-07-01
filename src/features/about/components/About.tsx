import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  return (
    <section ref={ref} id="about" className="py-40 px-6 md:px-12 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center relative">
      <motion.div 
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-3 font-sans text-[0.65rem] tracking-[0.25em] uppercase text-white/25 mb-10">
          <span>01 — Our Story</span>
          <div className="flex-1 h-[1px] bg-white/10 ml-2" />
        </div>
        
        <h2 className="text-[clamp(3rem,6vw,5.5rem)] font-bold mb-10 leading-[0.9]">
          A Bond<br />Beyond <em className="italic not-italic text-white/20">Music.</em>
        </h2>
        
        <div className="space-y-5 text-white/50 text-[0.95rem] leading-[1.8] max-w-[380px] font-light">
          <p>
            W.T.G.N — What The Game Needs — is a dynamic musical duo from South Africa. Y.T Dope Boy (Unam Nibe) from the Eastern Cape and Hope The Last (Tshepo Moalosi) from the Free State.
          </p>
          <motion.p
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            Their journey began at the SAE Institute in Rosebank, Johannesburg, where a shared passion for music turned into a powerful creative bond — a brotherhood cemented with matching W.T.G.N tattoos.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Rooted in hip-hop, their sound blends R&B, Afrobeat, and African genres into something layered, authentic, and raw.
          </motion.p>
        </div>

        <a href="#music" className="inline-flex items-center gap-3 mt-12 font-space text-[0.78rem] font-medium tracking-[0.12em] uppercase text-white border-b border-white/20 pb-1 hover:gap-6 hover:border-white transition-all group">
          Discover Our Sound 
          <span className="transform transition-transform group-hover:translate-x-1">→</span>
        </a>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <div className="absolute top-8 -right-4 bg-white text-black px-4 py-2 font-sans text-[0.6rem] tracking-[0.15em] uppercase font-medium z-10">
          // JOHANNESBURG, ZA
        </div>
        
        <div className="relative aspect-[3/4] max-h-[600px] overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]">
          <div className="absolute inset-0 z-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.01)_100%)] flex items-center justify-center">
            <span className="font-clash text-[0.7rem] tracking-[0.25em] text-white/10 whitespace-nowrap relative z-0">
              ARTIST PORTRAIT
            </span>
          </div>
          <motion.img 
            src="/images/WTGN_Tshepo_ceo-1.jpeg" 
            alt="W.T.G.N Portrait" 
            className="w-full h-[130%] absolute -top-[15%] left-0 object-cover z-1 opacity-100"
            style={{ y: imgY }}
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="absolute -bottom-8 -left-12 glass-card px-8 py-6">
          <div className="font-clash text-[2.8rem] font-bold tracking-[-0.04em] leading-none text-white">2024</div>
          <span className="block font-sans text-[0.65rem] tracking-[0.15em] uppercase text-white/35 mt-1">Year Formed — SAE Institute</span>
        </div>
      </motion.div>
    </section>
  );
}
