import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

import { events } from "@/constants/data";
import getLiveEvents from "@/backend/functions/getLiveEvents";
import { Event as EventType } from "@/types/index";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/backend/firebase/config";
import { unsubscribe } from "diagnostics_channel";

export function Events() {
  const [selectedLocation, setSelectedLocation] = useState(events[0].location);
  const [rsvpEvent, setRsvpEvent] = useState<(typeof events)[0] | null>(null);
  const [liveEvents, setLiveEvents] = useState<Array<EventType> | Array<Event> | null>();

  

  useEffect(() => {

    const ref = collection(db, "events");
    
    const unsubscribe = onSnapshot(ref, async () => {

      try {

        const response = await getLiveEvents();
        setLiveEvents(response);

      } catch (err) {

        console.log(err);

      }

    });


    

    return () => unsubscribe();

  },[]);

  useEffect(() => {
    if (rsvpEvent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [rsvpEvent]);

  return (
    <section id="events" className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
        <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold">
          Live
          <br />
          Dates
        </h2>
        <p className="max-w-[260px] font-sans text-[0.82rem] leading-[1.6] text-white/40 md:text-right font-light">
          Experience W.T.G.N on stage. Catch the movement in person.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 mt-16">
        <div>
          {liveEvents?.length !== 0 ? (
            <div>
              {liveEvents?.map((event: any, i) => (
                <>
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setSelectedLocation(event.location)}
                  className={`group relative grid grid-cols-[70px_1fr] md:grid-cols-[80px_1fr_auto_auto] items-center gap-6 md:gap-8 py-8 border-b border-white/[0.06] transition-colors cursor-pointer ${selectedLocation === event.location ? "bg-white/[0.03]" : "hover:bg-white/[0.01]"}`}>
                  <div className="relative z-10 pl-4 md:pl-0">
                    <div className="font-clash text-[2rem] font-bold tracking-[-0.04em] leading-none text-white">
                      {event.date.day}
                    </div>
                    <div className="font-sans text-[0.62rem] tracking-[0.15em] uppercase text-white/25 mt-1">
                      {event.date.month}
                    </div>
                  </div>
    
                  <div className="relative z-10">
                    <h4 className="text-[1.1rem] text-white mb-1">{event.title}</h4>
                    <p className="font-sans text-[0.8rem] text-white/35 font-light">
                      {event.desc}
                    </p>
                  </div>
    
                  <div className="hidden md:block relative z-10 font-sans text-[0.7rem] tracking-[0.05em] text-white/30 truncate max-w-[150px]">
                    {event.location.split(",")[0]}
                  </div>
    
                  <div className="relative z-10 col-start-2 md:col-start-auto pb-4 md:pb-0 flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedLocation(event.location);
                        setRsvpEvent(event);
                      }}
                      className="bg-transparent text-white border border-white/20 px-4 py-[0.6rem] font-space text-[0.65rem] font-medium tracking-[0.1em] uppercase hover:bg-white hover:text-black hover:border-white transition-all whitespace-nowrap">
                      RSVP
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedLocation(event.location);
                        window.dispatchEvent(
                          new CustomEvent("open-checkout", {
                            detail: {
                              id: `event-${event.id}`,
                              title: event.title,
                              price: 150,
                              type: "ticket",
                            },
                          }),
                        );
                      }}
                      className="bg-white text-black border border-white px-4 py-[0.6rem] font-space text-[0.65rem] font-medium tracking-[0.1em] uppercase hover:bg-transparent hover:text-white transition-all whitespace-nowrap">
                      Tickets
                    </button>
                  </div>
                </motion.div>
                </>

              )
            )}
          </div>
          )
          :
          (
            <div>
              No events
            </div>
          )}
        </div>

        {/* Map Frame Area */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="lg:sticky lg:top-32 h-[400px] lg:h-[500px] border border-white/10 bg-[#0a0a0a] p-2 flex flex-col">
          <div className="flex justify-between items-center px-4 py-3 border-b border-white/10 mb-2">
            <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-white/40">
              // Event Location
            </span>
            <span className="font-space text-[0.65rem] text-white/60 truncate max-w-[200px]">
              {selectedLocation}
            </span>
          </div>
          <div className="flex-1 w-full bg-white/5 relative overflow-hidden">
            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedLocation)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              title="Event Location"
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Subtle overlay to blend the map slightly better into the dark theme */}
            <div className="absolute inset-0 bg-black/10 pointer-events-none mix-blend-overlay" />
          </div>
        </motion.div>
      </div>

      {/* RSVP Modal */}
      <AnimatePresence>
        {rsvpEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setRsvpEvent(null)}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0a0a0a] border border-white/10 p-8 max-w-md w-full relative">
              <button
                onClick={() => setRsvpEvent(null)}
                className="absolute top-4 right-4 text-white/50 hover:text-white">
                ✕
              </button>
              <div className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-white/40 mb-2">
                RSVP / REMINDER
              </div>
              <h3 className="font-clash text-2xl font-bold mb-6 text-white">
                {rsvpEvent.title}
              </h3>

              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setRsvpEvent(null);
                  // Implementation for real data submission goes here
                }}>
                <div>
                  <label className="block font-sans text-[0.7rem] uppercase tracking-[0.1em] text-white/50 mb-2">
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[0.7rem] uppercase tracking-[0.1em] text-white/50 mb-2">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full mt-6 bg-white text-black py-3 font-space text-[0.75rem] font-bold tracking-[0.1em] uppercase hover:bg-white/90 transition-colors">
                  Confirm RSVP
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
