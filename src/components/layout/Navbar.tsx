import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { List, ListItem } from "@/components/ui/list";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-[1000] px-6 md:px-12 h-[72px] flex items-center justify-between transition-colors duration-400 ${
        isScrolled
          ? "bg-black/70 backdrop-blur-2xl"
          : "bg-transparent border-b border-white/5"
      }`}>
      <div className="flex items-center gap-2">
        <span className="font-clash font-bold text-[1.1rem] tracking-[0.12em] text-white">
          W.T.G.N
        </span>
        <span className="opacity-40 text-[0.65rem] tracking-[0.2em] font-sans font-light hidden sm:inline">
          EST. 2020
        </span>
      </div>

      <List className="hidden md:flex items-center gap-10">
        {[
          { label: "Home", href: "#home" },
          { label: "Story", href: "#about" },
          { label: "Music", href: "#music" },
          { label: "Events", href: "#events" },
          { label: "Book", href: "#booking" },
        ].map((link) => (
          <ListItem key={link.label}>
            <a
              href={link.href}
              className="font-space text-[0.78rem] tracking-[0.1em] text-white/50 uppercase transition-colors hover:text-white relative group">
              {link.label}
              <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-white transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          </ListItem>
        ))}
      </List>

      <a
        href="#newsletter"
        className="bg-white text-black px-[1.4rem] py-[0.55rem] font-space text-[0.75rem] font-semibold tracking-[0.08em] uppercase border border-transparent transition-all hover:bg-transparent hover:text-white hover:border-white">
        Join the Movement
      </a>
    </motion.nav>
  );
}
