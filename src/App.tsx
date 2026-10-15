/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { HomePage } from './components/home/HomePage';
import { ShopPage } from './components/shop/ShopPage';
import { CategoriesPage } from './components/categories/CategoriesPage';
import { RecipesPage } from './components/recipes/RecipesPage';
import { BlogListingPage } from './components/blog/BlogListingPage';
import { BlogArticlePage } from './components/blog/BlogArticlePage';
import { AboutPage } from './components/about/AboutPage';
import { ContactPage } from './components/contact/ContactPage';
import { ProductModal } from './components/shop/ProductModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { SitemapModal } from './components/seo/SitemapModal';
import { Product, OrderDetails } from './types';

const MainApp: React.FC = () => {
  const { selectedProduct, setSelectedProduct, setIsCartOpen } = useCart();
  
  const [currentView, setCurrentView] = useState<string>('home');
  const [viewParam, setViewParam] = useState<string>('');
  const [isSitemapOpen, setIsSitemapOpen] = useState<boolean>(false);

  // Sync routing from URL (supports both pathname /shop and hash #/shop for SPA hosting)
  useEffect(() => {
    const parseRouteFromUrl = () => {
      // 1. Check hash first: e.g. #/shop or #/blog/some-slug
      const hash = window.location.hash.replace(/^#\/?/, '').trim();
      // 2. Check pathname: e.g. /shop or /blog/some-slug
      const pathname = window.location.pathname.replace(/^\//, '').trim();

      const routeString = hash || pathname;
      if (!routeString) {
        setCurrentView('home');
        setViewParam('');
        return;
      }

      const parts = routeString.split('/');
      const main = parts[0];
      const param = parts.slice(1).join('/');

      if (main === 'blog' && param) {
        setCurrentView('blog-article');
        setViewParam(param);
      } else if (main === 'category' && param) {
        setCurrentView('shop');
        setViewParam(param);
      } else if (['home', 'shop', 'categories', 'offers', 'recipes', 'blog', 'about', 'contact'].includes(main)) {
        setCurrentView(main);
        setViewParam(param || '');
      } else {
        setCurrentView('home');
        setViewParam('');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    parseRouteFromUrl();
    window.addEventListener('hashchange', parseRouteFromUrl);
    window.addEventListener('popstate', parseRouteFromUrl);
    return () => {
      window.removeEventListener('hashchange', parseRouteFromUrl);
      window.removeEventListener('popstate', parseRouteFromUrl);
    };
  }, []);

  const navigateTo = (view: string, param: string = '') => {
    setCurrentView(view);
    setViewParam(param);

    let targetHash = '#/';
    if (view === 'home') {
      targetHash = '#/';
    } else if (view === 'blog-article') {
      targetHash = `#/blog/${param}`;
    } else if (view === 'shop' && param && param !== 'all' && param !== 'wishlist') {
      targetHash = `#/category/${param}`;
    } else if (view === 'shop' && param === 'wishlist') {
      targetHash = '#/shop';
    } else {
      targetHash = `#/${view}`;
    }

    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderSuccess = (order: OrderDetails) => {
    // order placed state is handled inside modal
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Global Navigation Header */}
      <Header
        currentView={currentView}
        onNavigate={navigateTo}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        )}

        {currentView === 'shop' && (
          <ShopPage
            initialCategory={viewParam && viewParam !== 'wishlist' ? viewParam : 'all'}
            initialFilter={viewParam === 'wishlist' ? 'wishlist' : 'all'}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        )}

        {currentView === 'offers' && (
          <ShopPage
            initialCategory="all"
            initialFilter="offers"
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        )}

        {currentView === 'categories' && (
          <CategoriesPage
            onSelectCategory={(slug) => navigateTo('shop', slug)}
          />
        )}

        {currentView === 'recipes' && (
          <RecipesPage />
        )}

        {currentView === 'blog' && (
          <BlogListingPage
            onSelectArticle={(slug) => navigateTo('blog-article', slug)}
            onNavigateHome={() => navigateTo('home')}
          />
        )}

        {currentView === 'blog-article' && (
          <BlogArticlePage
            slug={viewParam}
            onBackToBlogs={() => navigateTo('blog')}
            onNavigateCategory={(catSlug) => navigateTo('shop', catSlug)}
            onSelectArticle={(slug) => navigateTo('blog-article', slug)}
          />
        )}

        {currentView === 'about' && (
          <AboutPage onShopNow={() => navigateTo('shop')} />
        )}

        {currentView === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Global Footer */}
      <Footer 
        onNavigate={navigateTo} 
        onOpenSitemap={() => setIsSitemapOpen(true)}
      />

      {/* Floating & Slide-Over Modals */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onNavigateToCategory={(cat) => navigateTo('shop', cat)}
        />
      )}

      <CartDrawer 
        onNavigateToShop={() => navigateTo('shop')} 
      />

      <CheckoutModal 
        onOrderSuccess={handleOrderSuccess} 
      />

      <SitemapModal
        isOpen={isSitemapOpen}
        onClose={() => setIsSitemapOpen(false)}
      />

      {/* Toast Feedback Notifications */}
      <ToastContainer />

    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <MainApp />
    </CartProvider>
  );
}
