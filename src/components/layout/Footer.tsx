import { motion } from "motion/react";
import { List, ListItem } from "@/components/ui/list";

const InstagramIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="ig-grad" cx="0.3" cy="0.9" r="1" fx="0.3" fy="0.9">
        <stop offset="0%" stopColor="#f09433" />
        <stop offset="25%" stopColor="#e6683c" />
        <stop offset="50%" stopColor="#dc2743" />
        <stop offset="75%" stopColor="#cc2366" />
        <stop offset="100%" stopColor="#bc1888" />
      </radialGradient>
    </defs>
    <path
      fill="url(#ig-grad)"
      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"
    />
    <path
      fill="white"
      d="M12 7.115A4.885 4.885 0 1016.885 12 4.885 4.885 0 0012 7.115zm0 8.053a3.168 3.168 0 113.168-3.168A3.168 3.168 0 0112 15.168z"
    />
    <circle fill="white" cx="17.22" cy="6.78" r="1.15" />
  </svg>
);

const YoutubeIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#FF0000"
      d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 00-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 002.122 2.136C4.495 20.5 12 20.5 12 20.5s7.505 0 9.377-.55a3.016 3.016 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
    />
    <path fill="#FFFFFF" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export function Footer() {
  const socialLinks = [
    {
      name: "Instagram",
      icon: <InstagramIcon />,
      href: "https://www.instagram.com/wtgn2024/",
    },
    {
      name: "YouTube",
      icon: <YoutubeIcon />,
      href: "https://www.youtube.com/@w.t.g.n",
    },
  ];

  return (
    <footer className="bg-black pt-20 md:pt-32 pb-10 px-6 md:px-12 border-t border-white/6">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 pb-16 border-b border-white/6">
          <div className="lg:col-span-1">
            <h3 className="font-clash text-[1.5rem] font-bold tracking-wider text-white mb-4">
              W.T.G.N
            </h3>
            <p className="text-[0.8rem] text-white/40 max-w-[240px] leading-[1.7] font-sans font-light">
              What The Game Needs. A South African music movement built on
              brotherhood, passion, and purpose.
            </p>
            <div className="flex gap-4 mt-8">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[38px] h-[38px] flex items-center justify-center transition-transform hover:scale-110"
                  aria-label={social.name}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h5 className="font-space text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-white/25">
              Navigate
            </h5>
            <List className="space-y-3">
              <ListItem>
                <a
                  href="#home"
                  className="text-[0.82rem] text-white/45 hover:text-white transition-colors font-sans font-light">
                  Home
                </a>
              </ListItem>
              <ListItem>
                <a
                  href="#about"
                  className="text-[0.82rem] text-white/45 hover:text-white transition-colors font-sans font-light">
                  Our Story
                </a>
              </ListItem>
              <ListItem>
                <a
                  href="#music"
                  className="text-[0.82rem] text-white/45 hover:text-white transition-colors font-sans font-light">
                  Music
                </a>
              </ListItem>
              <ListItem>
                <a
                  href="#events"
                  className="text-[0.82rem] text-white/45 hover:text-white transition-colors font-sans font-light">
                  Events
                </a>
              </ListItem>
            </List>
          </div>

          <div className="space-y-6">
            <h5 className="font-space text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-white/25">
              Music
            </h5>
            <List className="space-y-3">
              <ListItem>
                <a
                  href="#"
                  className="text-[0.82rem] text-white/45 hover:text-white transition-colors font-sans font-light">
                  Full Catalog
                </a>
              </ListItem>
              <ListItem>
                <a
                  href="#"
                  className="text-[0.82rem] text-white/45 hover:text-white transition-colors font-sans font-light">
                  Buy Tracks
                </a>
              </ListItem>
              <ListItem>
                <a
                  href="#"
                  className="text-[0.82rem] text-white/45 hover:text-white transition-colors font-sans font-light">
                  Latest Drop
                </a>
              </ListItem>
              <ListItem>
                <a
                  href="#"
                  className="text-[0.82rem] text-white/45 hover:text-white transition-colors font-sans font-light">
                  Press Kit
                </a>
              </ListItem>
            </List>
          </div>

          <div className="space-y-6">
            <h5 className="font-space text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-white/25">
              Contact
            </h5>
            <List className="space-y-3">
              <ListItem>
                <a
                  href="mailto:contact@wtgn.co.za"
                  className="text-[0.82rem] text-white/45 hover:text-white transition-colors font-sans font-light">
                  contact@wtgn.co.za
                </a>
              </ListItem>
              <ListItem>
                <a
                  href="#"
                  className="text-[0.82rem] text-white/45 hover:text-white transition-colors font-sans font-light">
                  Bookings
                </a>
              </ListItem>
              <ListItem>
                <a
                  href="#"
                  className="text-[0.82rem] text-white/45 hover:text-white transition-colors font-sans font-light">
                  Features & Collabs
                </a>
              </ListItem>
              <ListItem>
                <a
                  href="#"
                  className="text-[0.82rem] text-white/45 hover:text-white transition-colors font-sans font-light ">
                  Johannesburg, ZA
                </a>
              </ListItem>
            </List>
          </div>
        </div>

        <a
          href="#home"
          className="block py-12 md:py-12 text-center font-clash text-[clamp(3rem,8vw,7rem)] font-bold tracking-[-0.04em] text-white/60 hover:text-white transition-colors overflow-hidden leading-none ">
          W.T.G.N
        </a>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[0.72rem] text-white/20 tracking-[0.08em] font-sans mt-8">
          <p>© 2024 W.T.G.N — What The Game Needs. All rights reserved.</p>
          <p>
            Designed & Developed by{" "}
            <a
              href="https://ambitrove.com"
              className="text-white font-medium hover:text-white/40 transition-colors">
              Ambitrove Team
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
