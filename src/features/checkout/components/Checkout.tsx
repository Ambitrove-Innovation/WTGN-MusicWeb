import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import { CheckoutItem } from '@/src/types';

export function Checkout() {
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState<CheckoutItem | null>(null);
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [paymentMethod, setPaymentMethod] = useState<'payfast' | 'stripe' | null>(null);

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<CheckoutItem>;
      setItem(customEvent.detail);
      setStep('details');
      setPaymentMethod(null);
      setIsOpen(true);
    };

    window.addEventListener('open-checkout', handleOpen);
    return () => window.removeEventListener('open-checkout', handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const closeCheckout = () => {
    setIsOpen(false);
    setTimeout(() => {
      setItem(null);
      setStep('details');
    }, 300);
  };

  const handlePay = (e: FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  return (
    <AnimatePresence>
      {isOpen && item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          onClick={closeCheckout}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl relative shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto md:max-h-none md:overflow-hidden bg-[linear-gradient(to_right,#171717_0%,#5a6164_100%)] md:bg-none md:bg-white text-white md:text-black"
          >
            {/* Diagonal Design Element (Desktop only) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
               <div className="absolute -top-[50%] -right-[20%] w-[100%] h-[200%] bg-[#0a0a0a] -rotate-[35deg] origin-top-right transform z-0" />
            </div>

            <button 
              onClick={closeCheckout}
              className="absolute top-4 right-4 z-50 text-white hover:text-white/70 transition-colors w-8 h-8 flex items-center justify-center bg-black/20 rounded-full"
            >
              ✕
            </button>

            <div className="flex flex-col md:flex-row relative z-10 w-full min-h-[400px]">
              {/* Left Side (Order Summary) */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-white/40 md:text-black/40 mb-2 block">
                    Secure Checkout
                  </span>
                  <h2 className="font-space text-3xl font-bold mb-6">Order Details</h2>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex gap-4 items-center">
                      {item.img && (
                         <img src={item.img} alt={item.title} className="w-16 h-16 object-cover bg-white/5 md:bg-black/5" />
                      )}
                      <div>
                        <div className="font-sans text-[0.7rem] uppercase tracking-[0.1em] text-white/50 md:text-black/50 mb-1">
                          {item.type === 'song' ? 'Digital Track' : item.type === 'bundle' ? 'Digital Album' : 'Event Ticket'}
                        </div>
                        <div className="font-bold text-xl">{item.title}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/20 md:border-black/10 pt-6">
                  <div className="flex justify-between items-end">
                    <span className="font-sans text-[0.75rem] uppercase tracking-[0.1em] text-white/60 md:text-black/60">Total Amount</span>
                    <span className="font-space text-2xl font-bold">R{item.price}</span>
                  </div>
                </div>
              </div>

              {/* Right Side (Black) - Payment */}
              <div className="w-full md:w-1/2 p-8 md:p-12 text-white flex flex-col justify-center">
                {step === 'details' && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <h3 className="font-sans text-[0.8rem] uppercase tracking-[0.1em] text-white/50 mb-6">
                      Select Payment Method
                    </h3>
                    
                    <div className="space-y-3">
                      <button 
                        onClick={() => { setPaymentMethod('payfast'); setStep('payment'); }}
                        className="w-full flex items-center justify-between p-4 border border-white/20 hover:bg-white inset hover:text-black hover:border-white transition-all group group/btn"
                      >
                        <div className="flex items-center gap-3">
                          <img src="/icons/Payfast-logo.webp" alt="PayFast" className="w-8 h-8 object-contain" />
                          <span className="font-space text-[0.8rem] font-bold tracking-[0.1em] uppercase">PayFast</span>
                        </div>
                        <span className="text-white/40 group-hover:text-black/40 group-hover/btn:translate-x-1 transition-transform">→</span>
                      </button>
                      <button 
                        onClick={() => { setPaymentMethod('stripe'); setStep('payment'); }}
                        className="w-full flex items-center justify-between p-4 border border-white/20 hover:bg-white inset hover:text-black hover:border-white transition-all group group/btn"
                      >
                        <div className="flex items-center gap-3">
                          <img src="/icons/stripe-icon.svg" alt="Stripe" className="w-8 h-8 object-contain" />
                          <span className="font-space text-[0.8rem] font-bold tracking-[0.1em] uppercase">Stripe</span>
                        </div>
                        <span className="text-white/40 group-hover:text-black/40 group-hover/btn:translate-x-1 transition-transform">→</span>
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 'payment' && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="flex items-center gap-3 mb-6">
                      <button onClick={() => setStep('details')} className="text-white/50 hover:text-white pb-1 border-b border-transparent hover:border-white text-sm transition-all">
                        ← Back
                      </button>
                    </div>
                    <form onSubmit={handlePay} className="space-y-4">
                      <div>
                        <label className="block font-sans text-[0.7rem] uppercase tracking-[0.1em] text-white/50 mb-2">Email Address</label>
                        <input required type="email" className="w-full bg-white/5 border border-white/20 px-4 py-3 text-white text-sm focus:outline-none focus:border-white transition-colors placeholder:text-white/20" placeholder="your@email.com" />
                      </div>
                      <div className="pt-2">
                        <button type="submit" className="w-full bg-white text-black py-4 font-space text-[0.8rem] font-bold tracking-[0.1em] uppercase hover:bg-white/90 transition-colors flex items-center justify-center gap-2">
                          Pay R{item.price} via {paymentMethod === 'payfast' ? 'PayFast' : 'Stripe'}
                        </button>
                      </div>
                      <div className="text-center mt-4">
                         <span className="text-[0.65rem] text-white/30 uppercase tracking-[0.1em] flex items-center justify-center gap-2">
                           <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                           Secure Encrypted Connection
                         </span>
                      </div>
                    </form>
                  </motion.div>
                )}

                {step === 'success' && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center h-full">
                    <div className="w-16 h-16 rounded-full border-2 border-green-400 text-green-400 flex items-center justify-center mb-6">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <h3 className="font-space text-2xl font-bold mb-2">Payment Successful</h3>
                    <p className="text-white/60 text-sm mb-8 px-4">
                      {item.type === 'ticket' ? 'Your ticket has been sent to your email with purchase details.' : 'Payment confirmed! An email with your receipt and track details has been sent.'}
                    </p>
                    <button 
                      onClick={() => {
                        closeCheckout();
                        window.dispatchEvent(new CustomEvent('purchase-complete', { detail: item.id }));
                        if (item.type !== 'ticket') {
                           setTimeout(() => {
                              window.dispatchEvent(new CustomEvent('open-download', { 
                                detail: { id: item.id, title: item.title, type: item.type, img: item.img } 
                              }));
                           }, 400);
                        }
                      }}
                      className="bg-transparent border border-white text-white px-8 py-3 font-space text-[0.7rem] uppercase tracking-[0.1em] hover:bg-white hover:text-black transition-all"
                    >
                      {item.type === 'ticket' ? 'Close' : 'Go to Download Page'}
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
