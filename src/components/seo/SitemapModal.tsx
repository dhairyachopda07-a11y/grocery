import React, { useState } from 'react';
import { X, Copy, Check, FileCode, Globe, Shield } from 'lucide-react';
import { BLOG_POSTS } from '../../data/blogs';
import { CATEGORIES } from '../../data/categories';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';

interface SitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SitemapModal: React.FC<SitemapModalProps> = ({ isOpen, onClose }) => {
  const { addToast } = useCart();
  const [activeTab, setActiveTab] = useState<'sitemap' | 'robots' | 'schema'>('sitemap');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const baseUrl = 'https://grocery-two-pi.vercel.app';
  const currentDate = new Date().toISOString().split('T')[0];

  // XML Sitemap string
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Core Static Pages -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/shop</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/categories</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/recipes</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- 8 Grocery Categories -->
${CATEGORIES.map(c => `  <url>
    <loc>${baseUrl}/category/${c.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}

  <!-- 12 Complete Editorial Blog Articles -->
${BLOG_POSTS.map(b => `  <url>
    <loc>${baseUrl}/blog/${b.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`).join('\n')}
</urlset>`;

  const robotsTxt = `# Kanchan Super Market robots.txt
User-agent: *
Allow: /
Allow: /shop
Allow: /categories
Allow: /blog
Allow: /recipes
Allow: /about
Allow: /contact

# Block demo checkout state from search engine spiders
Disallow: /checkout
Disallow: /cart

Sitemap: ${baseUrl}/sitemap.xml`;

  const schemaJson = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "GroceryStore",
    "name": "Kanchan Super Market",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
    "description": "Online supermarket delivering farm-fresh fruits, vegetables, dairy, and authentic Indian groceries at Kanchan Super Market.",
    "currenciesAccepted": "INR",
    "paymentAccepted": "Cash on Delivery, UPI, Debit Card, Credit Card",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Plot 42, Green Agro Park, Outer Ring Road",
      "addressLocality": "Bengaluru",
      "addressRegion": "Karnataka",
      "postalCode": "560103",
      "addressCountry": "IN"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Fresh Grocery Items",
      "itemListElement": PRODUCTS.slice(0, 10).map(p => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": p.name,
          "description": p.description,
          "offers": {
            "@type": "Offer",
            "price": p.price,
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock"
          }
        }
      }))
    }
  }, null, 2);

  const activeContent = 
    activeTab === 'sitemap' ? sitemapXml :
    activeTab === 'robots' ? robotsTxt : schemaJson;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    addToast('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
      <div 
        className="relative bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-stone-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-700" />
            <h2 className="text-lg font-bold text-stone-900">
              SEO Architecture, XML Sitemap & Robots.txt
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-stone-200 px-6 gap-4 text-xs font-semibold bg-stone-50">
          <button
            onClick={() => setActiveTab('sitemap')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'sitemap' ? 'border-emerald-600 text-emerald-800' : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            sitemap.xml ({BLOG_POSTS.length + CATEGORIES.length + 7} URLs)
          </button>
          <button
            onClick={() => setActiveTab('robots')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'robots' ? 'border-emerald-600 text-emerald-800' : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            robots.txt
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'schema' ? 'border-emerald-600 text-emerald-800' : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Schema.org (JSON-LD)
          </button>
        </div>

        {/* Code Content */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-stone-500 font-mono">
              {activeTab === 'sitemap' ? 'XML Schema 0.9 Specification' : activeTab === 'robots' ? 'Standard Robots Exclusion' : 'Structured Data Markup'}
            </span>
            <button
              onClick={handleCopy}
              className="text-xs text-emerald-700 font-semibold hover:text-emerald-900 flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Content'}</span>
            </button>
          </div>
          <pre className="bg-stone-900 text-stone-200 p-4 rounded-2xl text-xs font-mono overflow-x-auto max-h-96">
            <code>{activeContent}</code>
          </pre>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-800 text-white rounded-xl text-xs font-semibold hover:bg-stone-900"
          >
            Close Viewer
          </button>
        </div>

      </div>
    </div>
  );
};
