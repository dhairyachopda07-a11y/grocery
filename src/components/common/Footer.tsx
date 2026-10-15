import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Truck, 
  RotateCcw, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink 
} from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenSitemap?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSitemap }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Badges Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-stone-800 text-stone-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-900/60 text-emerald-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">2-Hour Delivery</p>
              <p className="text-xs text-stone-400">Slots from 6 AM to 11 PM</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-900/60 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">100% Quality Inspected</p>
              <p className="text-xs text-stone-400">Triple-checked freshness</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-900/60 text-emerald-400 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">No-Questions Return</p>
              <p className="text-xs text-stone-400">Instant credit at the doorstep</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-900/60 text-emerald-400 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Direct Farm Sourcing</p>
              <p className="text-xs text-stone-400">Zero middleman markup</p>
            </div>
          </div>
        </div>

        {/* Multi-column Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12 border-b border-stone-800">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-lg">
                F
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Fresh<span className="text-emerald-400">Basket</span>
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed pr-6">
              FreshBasket is an online grocery platform dedicated to bringing regional Indian agricultural harvests directly into modern urban homes. We partner with over 450 certified farmer collectives to deliver unadulterated staples, seasonal fruits, fresh dairy, and authentic kitchen essentials.
            </p>
            
            {/* Demo Notice Banner */}
            <div className="p-3 bg-stone-800/80 rounded-xl border border-stone-700/60 text-[11px] text-stone-300">
              <strong className="text-amber-400 block mb-0.5">Demo Storefront Demonstration</strong>
              This website is an interactive prototype demonstrating modern e-commerce architecture. All payment options, address validations, and contact data are simulated for showcase purposes.
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Shop & Explore</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors">
                  All Groceries
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('categories')} className="hover:text-white transition-colors">
                  Browse 8 Categories
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('offers')} className="hover:text-white transition-colors">
                  Today's Special Deals
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('recipes')} className="hover:text-white transition-colors">
                  Quick Indian Recipes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-white transition-colors">
                  FreshBasket Journal (12 Articles)
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Store Policies</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  About FreshBasket
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Help & FAQs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Delivery & Shipping Terms
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Cancellation & Refunds
                </button>
              </li>
              <li>
                <button onClick={onOpenSitemap} className="hover:text-white transition-colors flex items-center gap-1">
                  <span>XML Sitemap & SEO</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Placeholders */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Contact & Hub</h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Plot 42, Outer Ring Road, Bellandur, Bengaluru 560103</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>1800-419-BASKET (Demo Helpline)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>care@freshbasket-demo.in</span>
              </div>
              <p className="text-[11px] pt-1 text-stone-400">
                Operating Hours: 06:00 AM – 11:00 PM IST (All 7 Days)
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>© 2026 FreshBasket Groceries Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>FSSAI Lic. No: 11224334000987 (Demo)</span>
            <span>Made with Indian Farm Fresh Quality</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
