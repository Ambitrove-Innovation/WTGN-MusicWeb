import { Cursor } from '@/src/components/common/Cursor';
import { Navbar } from '@/src/components/layout/Navbar';
import { Footer } from '@/src/components/layout/Footer';
import { AppRoutes } from './routes';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20 selection:text-white">
      <Cursor />
      <Navbar />
      <main>
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}
