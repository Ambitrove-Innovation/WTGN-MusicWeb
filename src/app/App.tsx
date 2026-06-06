import { Cursor } from "@/components/common/Cursor";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AppRoutes } from "./routes";
import { ToastProvider } from "@/components/ui/toast";

export default function App() {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-black text-white selection:bg-white/20 selection:text-white">
        <Cursor />
        <Navbar />
        <main>
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </ToastProvider>
  );
}
