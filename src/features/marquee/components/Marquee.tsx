import { motion } from 'motion/react';

const items = [
  'What The Game Needs',
  'Raw Sound. Real Stories.',
  'More Than Music. A Movement.',
  'South Africa\'s Rising Duo',
  'Authentic Vibes. Global Vision.',
  'W.T.G.N // SAE Institute',
];

export function Marquee() {
  return (
    <div className="bg-white text-black py-[1.2rem] overflow-hidden relative z-10" aria-hidden="true">
      <div className="flex whitespace-nowrap overflow-hidden">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          className="flex items-center gap-10 hover:[animation-play-state:paused]"
        >
          {[...items, ...items, ...items].map((item, i) => (
            <div key={i} className="flex items-center gap-10 px-10">
              <span className="font-clash text-[0.75rem] font-semibold tracking-[0.18em] uppercase text-black">
                {item}
              </span>
              <div className="w-1 h-1 rounded-full bg-black flex-shrink-0" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
