import { motion } from "motion/react";

import { artistData } from "@/src/constants/data";

export function Biographies() {
  return (
    <section
      id="biographies"
      className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-white/[0.06]">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20 text-center">
        <div className="flex justify-center items-center gap-3 font-sans text-[0.65rem] tracking-[0.25em] uppercase text-white/25 mb-8">
          <div className="w-8 h-[1px] bg-white/10" />
          <span>The Minds Behind The Movement</span>
          <div className="w-8 h-[1px] bg-white/10" />
        </div>
        <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-none">
          The <em className="italic not-italic text-white/40">Architects</em>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
        {artistData.map((artist, i) => (
          <motion.div
            key={artist.id}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="group relative bg-[#0a0a0a] border border-white/5 p-8 md:p-12 transition-colors hover:bg-[rgba(255,255,255,0.02)] overflow-hidden flex flex-col">
            {/* Background Texture over hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="flex items-center gap-6 mb-10">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border border-white/10 relative shrink-0">
                <img
                  src={artist.image}
                  alt={artist.alias}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="block font-sans text-[0.6rem] tracking-[0.2em] uppercase text-white/30 mb-2">
                  // {artist.role}
                </span>
                <h3 className="font-clash text-[1.8rem] md:text-[2.2rem] font-bold tracking-[-0.02em] leading-none text-white mb-2">
                  {artist.alias}
                </h3>
                <span className="block font-sans text-[0.75rem] text-white/50 tracking-[0.05em]">
                  {artist.name} <span className="text-white/20 mx-2">|</span>{" "}
                  {artist.origin}
                </span>
              </div>
            </div>

            <div className="space-y-6 flex-1">
              <div>
                <h4 className="font-sans text-[0.65rem] tracking-[0.1em] uppercase text-white/20 mb-2">
                  Background
                </h4>
                <p className="font-sans text-[0.85rem] text-white/60 leading-[1.7] font-light">
                  {artist.bio}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/[0.06]">
                <div>
                  <h4 className="font-sans text-[0.65rem] tracking-[0.1em] uppercase text-white/20 mb-2">
                    Contributions
                  </h4>
                  <p className="font-sans text-[0.8rem] text-white/45 leading-[1.6] font-light">
                    {artist.contributions}
                  </p>
                </div>
                <div>
                  <h4 className="font-sans text-[0.65rem] tracking-[0.1em] uppercase text-white/20 mb-2">
                    Influences
                  </h4>
                  <p className="font-sans text-[0.8rem] text-white/45 leading-[1.6] font-light">
                    {artist.influences}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
