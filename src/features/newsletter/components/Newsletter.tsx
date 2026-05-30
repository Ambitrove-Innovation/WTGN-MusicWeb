import { motion } from 'motion/react';
import React, { useState } from 'react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      setIsSubscribed(true);
      setErrorMsg(false);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail('');
    } else {
      setErrorMsg(true);
      setTimeout(() => setErrorMsg(false), 2000);
    }
  };

  return (
    <section id="newsletter" className="py-32 px-6 md:px-12 bg-white text-black grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="font-sans text-[0.65rem] tracking-[0.25em] uppercase text-black/35 mb-8 flex items-center">
          <span>// Stay in the Loop</span>
        </div>
        <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold mb-4 text-black">Join the<br />Movement</h2>
        <p className="font-sans text-[0.9rem] text-gray-600 max-w-[320px] leading-[1.7] font-light">
          New music, exclusive drops, and tour updates delivered straight to you.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className={`flex border ${errorMsg ? 'border-red-500 border-l-[3px]' : 'border-black/15'} overflow-hidden focus-within:border-black transition-colors`}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 bg-transparent border-none outline-none px-[1.2rem] py-4 font-sans text-[0.85rem] text-black w-full"
              required
            />
            <button
              type="submit"
              className={`border-none px-[1.8rem] py-4 font-space text-[0.72rem] font-semibold tracking-[0.1em] uppercase transition-colors whitespace-nowrap ${isSubscribed ? 'bg-[#333] text-white' : 'bg-black text-white hover:bg-gray-600'}`}
            >
              {isSubscribed ? 'Subscribed ✓' : 'Subscribe →'}
            </button>
          </div>
          <p className="font-sans text-[0.68rem] text-gray-400 tracking-[0.05em] font-light">
            No spam — only what the game needs. Unsubscribe anytime.
          </p>
        </form>
      </motion.div>
    </section>
  );
}
