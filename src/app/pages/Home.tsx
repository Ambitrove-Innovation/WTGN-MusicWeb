import { Hero } from "@/features/hero/components/Hero";
import { About } from "@/features/about/components/About";
import { Biographies } from "@/features/biographies/components/Biographies";
import { Music } from "@/features/music/components/Music";
import { Manifesto } from "@/features/manifesto/components/Manifesto";
import { Events } from "@/features/events/components/Events";
import { Booking } from "@/features/booking/components/Booking";
import { Newsletter } from "@/features/newsletter/components/Newsletter";
import { Marquee } from "@/features/marquee/components/Marquee";

export function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Biographies />
      <Music />
      <Manifesto />
      <Events />
      <Booking />
      <Newsletter />
    </>
  );
}
