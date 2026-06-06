import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export type DownloadItem = {
  id: string;
  title: string;
  type: "song" | "bundle";
  img?: string;
};

export function DownloadPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState<DownloadItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<DownloadItem>;
      setItem(customEvent.detail);
      setIsOpen(true);
      setIsPlaying(false);
      setProgress(0);
    };

    window.addEventListener("open-download", handleOpen);
    return () => window.removeEventListener("open-download", handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleHashChange = () => {
      closeDownloadPage();
      document.body.style.overflow = "unset";
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeDownloadPage();
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const closeDownloadPage = () => {
    setIsOpen(false);
    setIsPlaying(false);
    setTimeout(() => {
      setItem(null);
    }, 300);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <AnimatePresence>
      {isOpen && item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeDownloadPage}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#050505] overflow-y-auto">
          {/* Header */}
          <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50">
            <div className="font-space font-bold tracking-widest uppercase text-white">
              W.T.G.N / Vault
            </div>
            <button
              onClick={closeDownloadPage}
              className="text-white hover:text-white/70 transition-colors flex items-center gap-2 font-sans text-xs tracking-widest uppercase">
              Close <span className="text-xl">✕</span>
            </button>
          </div>

          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-6xl mx-auto p-4 md:p-12 min-h-screen py-24 flex flex-col justify-center">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
              {/* Left side / Top on mobile - Album Cover */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="w-full max-w-sm md:w-1/2 md:max-w-none aspect-square relative group">
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-500" />
                <img
                  src={item.img || "/images/WTGN-cover-album-1.jpeg"}
                  alt={item.title}
                  className="w-full h-full object-cover shadow-[0_0_50px_rgba(255,255,255,0.05)] border border-white/10"
                />

                {isPlaying && (
                  <div className="absolute bottom-0 left-0 w-full h-2 bg-white/10 z-20">
                    <div
                      className="h-full bg-white transition-all duration-1000 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </motion.div>

              {/* Right side / Bottom on mobile - Details */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="w-full md:w-1/2 flex flex-col">
                <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-green-400 mb-4 block flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  Fully Unlocked — Ready
                </span>

                <h1 className="font-clash text-4xl md:text-6xl font-bold text-white mb-2">
                  {item.title}
                </h1>
                <p className="font-sans text-white/50 tracking-wider text-sm mb-12">
                  {item.type === "bundle"
                    ? "Full Digital Album (MP3/WAV)"
                    : "High-Quality Digital Track (MP3/WAV)"}
                </p>

                <div className="space-y-4 mb-12">
                  <div className="bg-white/5 border border-white/10 p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <div className="font-sans font-bold text-white mb-1">
                        Standard Quality (MP3)
                      </div>
                      <div className="font-sans text-xs text-white/40 uppercase tracking-wider">
                        320kbps • ~8MB
                      </div>
                    </div>
                    <button className="bg-white text-black px-6 py-3 font-space text-[0.7rem] font-bold tracking-widest uppercase hover:bg-white/80 transition-colors w-full sm:w-auto">
                      Download MP3
                    </button>
                  </div>

                  <div className="bg-[#0a0a0a] border border-white/10 p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <div className="font-sans font-bold text-white mb-1">
                        Studio Quality (WAV)
                      </div>
                      <div className="font-sans text-xs text-white/40 uppercase tracking-wider">
                        Lossless • ~45MB
                      </div>
                    </div>
                    <button className="bg-transparent border border-white text-white px-6 py-3 font-space text-[0.7rem] font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all w-full sm:w-auto">
                      Download WAV
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-4 font-space text-[0.8rem] tracking-widest uppercase transition-all flex-1 justify-center">
                    {isPlaying ? (
                      <>
                        <span className="text-xl leading-none">■</span> Stop
                        Playback
                      </>
                    ) : (
                      <>
                        <span className="text-xl leading-none">▶</span> Listen
                        Full Version
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
