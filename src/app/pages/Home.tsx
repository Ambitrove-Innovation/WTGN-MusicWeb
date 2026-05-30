import { Hero } from '@/src/features/hero/components/Hero';
import { About } from '@/src/features/about/components/About';
import { Biographies } from '@/src/features/biographies/components/Biographies';
import { Music } from '@/src/features/music/components/Music';
import { Manifesto } from '@/src/features/manifesto/components/Manifesto';
import { Events } from '@/src/features/events/components/Events';
import { Newsletter } from '@/src/features/newsletter/components/Newsletter';
import { Marquee } from '@/src/features/marquee/components/Marquee';

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
      <Newsletter />
    </>
  );
}
