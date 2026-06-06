import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toastManager } from "@/components/ui/toast";

const PREVIEW_LIMIT = 15;

const parseDuration = (str: string) => {
  const parts = str.split(":");
  return parseInt(parts[0]) * 60 + parseInt(parts[1]);
};

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

import { tracks } from "@/constants/data";

export function Music() {
  const [playingState, setPlayingState] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [unlockedTracks, setUnlockedTracks] = useState<string[]>([]);
  const previewEndedToastSent = useRef(false);

  useEffect(() => {
    const handlePurchase = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const itemId = customEvent.detail;
      setUnlockedTracks((prev) => [...prev, itemId]);
      if (playingState === itemId) {
        setPlayingState(null);
      }
      toastManager.add({
        title: "Item unlocked",
        description: "Downloading the track you unlocked now.",
        type: "success",
        data: {
          rootProps: {
            className: "bg-black text-gray-300 border border-white/10",
          },
        },
      });
    };

    window.addEventListener("purchase-complete", handlePurchase);
    return () =>
      window.removeEventListener("purchase-complete", handlePurchase);
  }, [playingState]);

  useEffect(() => {
    previewEndedToastSent.current = false;
    let interval: NodeJS.Timeout;
    if (playingState) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const isUnlocked = unlockedTracks.includes(playingState);

          let limit = PREVIEW_LIMIT;
          if (isUnlocked) {
            if (playingState === "featured") {
              limit = 240; // 4 mins mock
            } else {
              const t = tracks.find((tr) => `t${tr.id}` === playingState);
              if (t) limit = parseDuration(t.duration);
            }
          }

          if (prev >= limit - 1) {
            clearInterval(interval);
            setPlayingState(null);
            if (!isUnlocked && !previewEndedToastSent.current) {
              previewEndedToastSent.current = true;
              toastManager.add({
                title: "Preview ended",
                description:
                  "Unlock the full track to continue listening and download.",
                type: "info",
                data: {
                  rootProps: {
                    className: "bg-black text-gray-300 border border-white/10",
                  },
                },
              });
            }
            return limit;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [playingState, unlockedTracks]);

  const togglePlay = (id: string) => {
    if (playingState === id) {
      setPlayingState(null);
    } else {
      setProgress(0);
      setPlayingState(id);
    }
  };

  const handleShare = (trackId: number) => {
    const trackUrl = `${window.location.origin}/?track=${trackId}`;
    navigator.clipboard.writeText(trackUrl).then(() => {
      toastManager.add({
        title: "Link copied",
        description: "Share the track URL with your crew.",
        type: "success",
        data: {
          rootProps: {
            className: "bg-black text-gray-300 border border-white/10",
          },
        },
      });
    });
  };

  return (
    <section
      id="music"
      className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto relative">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-20">
        <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold">
          The
          <br />
          Catalog
        </h2>
        <p className="max-w-[260px] text-[0.82rem] leading-[1.6] text-white/40 md:text-right font-light">
          Experience the sound. Stream previews or own the track — your movement
          starts here.
        </p>
      </motion.div>

      {/* Featured Release */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 bg-[#0a0a0a] border border-white/5 overflow-hidden mb-0.5 group">
        {(() => {
          const isFeaturedPlaying = playingState === "featured";
          const isFeaturedUnlocked = unlockedTracks.includes("featured");
          const featuredLimit = isFeaturedUnlocked ? 240 : PREVIEW_LIMIT;
          const displayFeaturedProgress = isFeaturedPlaying ? progress : 0;
          const isFeaturedFading =
            isFeaturedPlaying &&
            !isFeaturedUnlocked &&
            featuredLimit - progress <= 5 &&
            featuredLimit - progress > 0;

          return (
            <>
              <div className="flex items-center justify-center min-h-[320px] relative overflow-hidden">
                <img
                  src="/images/WTGN-cover-album-1.jpeg"
                  alt="Featured Release"
                  className={`absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-1000 ${isFeaturedFading ? "opacity-20 grayscale brightness-50" : "opacity-100"}`}
                  referrerPolicy="no-referrer"
                />
                <div
                  className={`absolute inset-0 transition-colors duration-1000 ${isFeaturedFading ? "bg-black/90" : "bg-gradient-to-t from-[#0a0a0a] via-black/40 to-transparent"}`}
                />

                <div className="absolute top-6 left-6 bg-white text-black px-3 py-1.5 font-sans text-[0.58rem] font-semibold tracking-[0.2em] uppercase z-10">
                  // Featured {isFeaturedUnlocked ? "Release" : "Preview"}
                </div>
                <div
                  className={`w-[100px] h-[100px] rounded-full border border-white/30 flex items-center justify-center relative z-10 group-hover:animate-[spin_8s_linear_infinite] backdrop-blur-sm transition-colors duration-1000 ${isFeaturedFading ? "bg-black/80" : "bg-black/40"}`}>
                  <div className="absolute w-[22px] h-[22px] rounded-full border border-white/50" />
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <circle
                      cx="15"
                      cy="15"
                      r="14"
                      stroke="rgba(255,255,255,0.4)"
                      strokeWidth="1"
                    />
                    <circle
                      cx="15"
                      cy="15"
                      r="8"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="1"
                    />
                    <circle
                      cx="15"
                      cy="15"
                      r="3"
                      stroke="rgba(255,255,255,0.6)"
                      strokeWidth="1"
                    />
                  </svg>
                </div>

                {/* Featured Progress */}
                {isFeaturedPlaying && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-20">
                    <div
                      className={`h-full transition-all duration-1000 ease-linear ${isFeaturedFading ? "bg-red-500" : "bg-white"}`}
                      style={{
                        width: `${(displayFeaturedProgress / featuredLimit) * 100}%`,
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="p-12 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-6">
                  <span className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-white/25 block">
                    // Latest Drop — 2024
                  </span>
                  {isFeaturedPlaying && (
                    <span
                      className={`font-sans text-[0.65rem] tracking-[0.1em] uppercase ${isFeaturedFading ? "text-red-400 animate-pulse" : "text-white/40"}`}>
                      {formatTime(displayFeaturedProgress)} /{" "}
                      {formatTime(featuredLimit)}{" "}
                      {isFeaturedFading && "- Fading Out"}
                    </span>
                  )}
                </div>
                <h3 className="text-[clamp(1.8rem,3vw,2.8rem)] font-bold text-white mb-2">
                  Movement
                </h3>
                <span className="font-sans text-[0.8rem] text-white/35 mb-8 block">
                  W.T.G.N — Hip-Hop / Afrobeats
                </span>
                <p className="font-sans text-[0.85rem] text-white/40 max-w-[320px] mb-10 leading-relaxed font-light">
                  A bold statement on identity, brotherhood, and the drive to
                  push beyond borders. This is what the game needs.
                </p>

                <div
                  className={`flex items-center gap-[3px] h-[32px] mb-8 transition-opacity duration-1000 ${isFeaturedPlaying ? "opacity-100" : "opacity-20"} ${isFeaturedFading ? "opacity-10" : ""}`}
                  aria-hidden="true">
                  {[8, 14, 22, 10, 18, 28, 14, 20, 8, 24, 16, 12].map(
                    (h, i) => (
                      <div
                        key={i}
                        className="w-[3px] bg-white/20 rounded-sm transition-colors duration-300 group-hover:bg-white/50"
                        style={{
                          height: `${h}px`,
                          animationName: isFeaturedPlaying
                            ? "waveAnim"
                            : "none",
                          animationDuration: `${i % 3 === 0 ? 1.5 : i % 2 === 0 ? 0.9 : 1.2}s`,
                          animationTimingFunction: "ease",
                          animationIterationCount: "infinite",
                          animationDirection: "alternate",
                          animationDelay: `${i * 0.05}s`,
                        }}
                      />
                    ),
                  )}
                </div>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => togglePlay("featured")}
                    className={`px-5 py-2.5 font-space text-[0.68rem] font-semibold tracking-[0.1em] uppercase transition-colors flex items-center justify-center gap-2 ${playingState === "featured" ? "bg-gray-200 text-black" : "bg-white text-black hover:bg-gray-200"}`}>
                    {playingState === "featured"
                      ? "■  Stop Playback"
                      : "▶  Preview Track"}
                  </button>
                  <button
                    onClick={() => {
                      if (isFeaturedUnlocked) {
                        toastManager.add({
                          title: "Downloading album",
                          description:
                            "Your featured release is downloading now.",
                          type: "success",
                          data: {
                            rootProps: {
                              className:
                                "bg-black text-gray-300 border border-white/10",
                            },
                          },
                        });
                      } else {
                        window.dispatchEvent(
                          new CustomEvent("open-checkout", {
                            detail: {
                              id: "featured",
                              title: "Movement Bundle",
                              price: 120,
                              type: "bundle",
                              img: "/images/WTGN-cover-album-1.jpeg",
                            },
                          }),
                        );
                      }
                    }}
                    className={`px-4 py-2.5 font-space text-[0.68rem] font-medium tracking-[0.1em] uppercase border transition-all ${isFeaturedUnlocked ? "bg-white text-black border-white hover:bg-transparent hover:text-white" : "bg-transparent text-white/50 border-white/15 hover:border-white hover:text-white"}`}>
                    {isFeaturedUnlocked ? "Download Bundle" : "Buy — R120 →"}
                  </button>
                </div>
              </div>
            </>
          );
        })()}
      </motion.div>

      {/* Track Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2px]">
        {tracks.map((track, i) => {
          const trackIdStr = `t${track.id}`;
          const isPlaying = playingState === trackIdStr;
          const isUnlocked = unlockedTracks.includes(trackIdStr);
          const limit = isUnlocked
            ? parseDuration(track.duration)
            : PREVIEW_LIMIT;
          const displayProgress = isPlaying ? progress : 0;
          const isFading =
            isPlaying &&
            !isUnlocked &&
            limit - progress <= 5 &&
            limit - progress > 0;

          return (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-[#0a0a0a] border border-white/5 p-8 transition-all hover:bg-white/5 hover:border-white/15 overflow-hidden flex flex-col">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />

              <span className="font-sans text-[0.6rem] tracking-[0.2em] text-white/20 mb-8 block">
                // {track.id.toString().padStart(3, "0")}{" "}
                {isUnlocked ? "- UNLOCKED" : ""}
              </span>

              <div className="w-full aspect-square border border-white/5 mb-6 relative overflow-hidden flex items-center justify-center">
                <div
                  className={`absolute inset-0 transition-colors duration-1000 z-10 ${isFading ? "bg-black/90" : "bg-black/40 group-hover:bg-transparent"}`}
                />
                <div
                  className={`w-10 h-10 border rounded-full flex items-center justify-center text-[1rem] relative z-20 transition-all duration-500 ${isFading ? "border-red-500/50 text-red-500/50 opacity-100" : "border-white/20 text-white/50 group-hover:opacity-0"}`}>
                  {isPlaying ? (
                    <div className="flex items-center justify-center gap-[2px] h-3">
                      <div className="w-[2px] bg-current h-full animate-[waveAnim_0.8s_ease_infinite_alternate]" />
                      <div
                        className="w-[2px] bg-current h-full animate-[waveAnim_1.2s_ease_infinite_alternate]"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <div
                        className="w-[2px] bg-current h-full animate-[waveAnim_0.9s_ease_infinite_alternate]"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </div>
                  ) : (
                    "♪"
                  )}
                </div>
                <img
                  src={track.img}
                  alt=""
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${isFading ? "opacity-20 grayscale brightness-50 scale-100" : "group-hover:scale-105"}`}
                  referrerPolicy="no-referrer"
                />

                {/* Individual Track Progress Bar */}
                {isPlaying && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-20">
                    <div
                      className={`h-full transition-all duration-1000 ease-linear ${isFading ? "bg-red-500" : "bg-white"}`}
                      style={{ width: `${(displayProgress / limit) * 100}%` }}
                    />
                  </div>
                )}
              </div>

              <div className="flex-1 flex flex-col justify-end">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-[1.1rem] font-semibold text-white truncate pr-2">
                    {track.title}
                  </h4>
                  {isPlaying && (
                    <span
                      className={`font-sans text-[0.65rem] tracking-[0.1em] whitespace-nowrap pt-1 ${isFading ? "text-red-400 animate-pulse" : "text-white/50"}`}>
                      {formatTime(displayProgress)} / {formatTime(limit)}
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-4 font-sans text-[0.72rem] text-white/30 tracking-[0.06em]">
                    <span>{track.genre}</span>
                    {!isPlaying && <span>{track.duration}</span>}
                  </div>
                  {!isUnlocked && (
                    <span className="font-sans text-[0.55rem] text-white/20 uppercase tracking-[0.15em]">
                      Preview
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => togglePlay(`t${track.id}`)}
                    className={`flex-1 py-3 font-space text-[0.62rem] font-semibold tracking-[0.1em] uppercase transition-colors flex items-center justify-center gap-2 ${isPlaying ? "bg-gray-200 text-black" : "bg-white text-black hover:bg-gray-200"}`}>
                    {isPlaying ? "■ Stop" : "▶ Play"}
                  </button>
                  <button
                    onClick={() => handleShare(track.id)}
                    className="px-3 bg-transparent border border-white/15 text-white/50 py-3 font-space text-[0.62rem] font-medium tracking-[0.1em] uppercase hover:border-white hover:text-white transition-all flex items-center justify-center"
                    title="Share Track">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <circle cx="18" cy="5" r="3"></circle>
                      <circle cx="6" cy="12" r="3"></circle>
                      <circle cx="18" cy="19" r="3"></circle>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      if (isUnlocked) {
                        toastManager.add({
                          title: "Downloading track",
                          description: "Your track is downloading now.",
                          type: "success",
                          data: {
                            rootProps: {
                              className:
                                "bg-black text-gray-300 border border-white/10",
                            },
                          },
                        });
                      } else {
                        window.dispatchEvent(
                          new CustomEvent("open-checkout", {
                            detail: {
                              id: trackIdStr,
                              title: track.title,
                              price: 35,
                              type: "song",
                              img: track.img,
                            },
                          }),
                        );
                      }
                    }}
                    className={`px-3 border py-3 font-space text-[0.62rem] font-medium tracking-[0.1em] uppercase transition-all whitespace-nowrap ${isUnlocked ? "bg-white text-black border-white hover:bg-transparent hover:text-white" : "bg-transparent text-white/50 border-white/15 hover:border-white hover:text-white"}`}>
                    {isUnlocked ? "Download" : "R35 - Buy"}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
