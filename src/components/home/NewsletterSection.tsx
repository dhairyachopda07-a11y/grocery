import React, { useState } from 'react';
import { Mail, Check, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addToast } = useCart();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubscribed(true);
    addToast('Subscribed! Check your inbox for weekly seasonal recipes.');
    setEmail('');
  };

  return (
    <section className="py-14 sm:py-16 bg-white border-t border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Mail className="w-6 h-6" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          Get Seasonal Produce Alerts & Chef Recipes
        </h2>
        
        <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-lg mx-auto">
          Join 28,000+ conscious cooks receiving our Friday farm dispatch, price-drop alerts on mangoes and apples, and weekly zero-waste kitchen tips.
        </p>

        {isSubscribed ? (
          <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl max-w-md mx-auto text-emerald-800 text-xs flex items-center justify-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">
              Thank you for subscribing! Your ₹100 welcome coupon code is <strong className="text-emerald-950">FRESH100</strong>.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="mt-6 max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-emerald-600"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl text-xs sm:text-sm transition-colors shadow-sm shrink-0"
            >
              Subscribe
            </button>
          </form>
        )}

        {error && (
          <p className="text-xs text-rose-600 mt-2">{error}</p>
        )}

        <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-stone-400">
          <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
          <span>We respect your inbox. Zero spam. Unsubscribe anytime in 1-click.</span>
        </div>

      </div>
    </section>
  );
};
