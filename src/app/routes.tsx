import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Checkout } from '@/src/features/checkout/components/Checkout';
import { DownloadPage } from '@/src/features/downloads/components/DownloadPage';

export function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Checkout />
      <DownloadPage />
    </>
  );
}
