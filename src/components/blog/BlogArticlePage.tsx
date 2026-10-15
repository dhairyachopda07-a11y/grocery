import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Share2, 
  Check, 
  ShoppingBag, 
  BookOpen, 
  Sparkles,
  Link as LinkIcon
} from 'lucide-react';
import { BlogPost } from '../../types';
import { BLOG_POSTS } from '../../data/blogs';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { useCart } from '../../context/CartContext';

interface BlogArticlePageProps {
  slug: string;
  onBackToBlogs: () => void;
  onNavigateCategory?: (categorySlug: string) => void;
  onSelectArticle: (slug: string) => void;
}

export const BlogArticlePage: React.FC<BlogArticlePageProps> = ({
  slug,
  onBackToBlogs,
  onNavigateCategory,
  onSelectArticle
}) => {
  const { addToast } = useCart();
  const [copied, setCopied] = useState(false);

  const post = BLOG_POSTS.find(p => p.slug === slug) || BLOG_POSTS[0];

  // Update document title, canonical, and Schema.org Article metadata for SEO
  useEffect(() => {
    if (!post) return;

    const originalTitle = document.title;
    const articleTitle = `${post.seoTitle} | FreshBasket Journal`;
    document.title = articleTitle;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 1. Meta description
    let descMeta = document.querySelector('meta[name="description"]');
    const originalDesc = descMeta?.getAttribute('content') || '';
    if (descMeta) {
      descMeta.setAttribute('content', post.metaDescription);
    }

    // 2. Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    const originalCanonical = canonicalLink?.getAttribute('href') || '';
    const currentOrigin = window.location.origin || 'https://freshbasket.in';
    const canonicalUrl = `${currentOrigin}/blog/${post.slug}`;
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonicalUrl);
    }

    // 3. Open Graph Tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogTitle) ogTitle.setAttribute('content', articleTitle);
    if (ogDesc) ogDesc.setAttribute('content', post.metaDescription);
    if (ogImage) ogImage.setAttribute('content', post.coverImage);

    // 4. Inject Schema.org Article / BlogPosting JSON-LD
    const scriptId = 'blog-schema-jsonld';
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = scriptId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': post.title,
      'description': post.metaDescription,
      'image': [post.coverImage],
      'datePublished': post.publishedDate,
      'author': {
        '@type': 'Person',
        'name': post.author.name,
        'jobTitle': post.author.role
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'FreshBasket',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80'
        }
      },
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': canonicalUrl
      }
    });

    return () => {
      document.title = originalTitle;
      if (descMeta && originalDesc) descMeta.setAttribute('content', originalDesc);
      if (canonicalLink && originalCanonical) canonicalLink.setAttribute('href', originalCanonical);
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [post]);

  const relatedArticles = BLOG_POSTS
    .filter(p => p.id !== post.id && (p.category === post.category || p.featured))
    .slice(0, 3);

  const handleCopyLink = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      addToast('Article link copied to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      addToast('Article link ready to share!');
    }
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`Read "${post.title}" on FreshBasket: ${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`Helpful grocery guide: "${post.title}" via @FreshBasket`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  return (
    <article className="py-8 sm:py-12 bg-stone-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back and Breadcrumbs */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBackToBlogs}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition-colors bg-white px-3.5 py-1.5 rounded-full border border-stone-200 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All 12 Guides</span>
          </button>

          <nav className="hidden sm:flex items-center gap-2 text-xs text-stone-400">
            <span>Journal</span>
            <span>/</span>
            <span className="text-stone-700 font-medium">{post.category}</span>
          </nav>
        </div>

        {/* Article Header Card */}
        <header className="space-y-4 mb-8">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span className="font-bold text-emerald-700 uppercase tracking-wider">{post.category}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.publishedDate}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
            {post.excerpt}
          </p>

          {/* Author Badge & Social Shares */}
          <div className="pt-4 border-t border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                {post.author.name.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-bold text-stone-900">{post.author.name}</p>
                <p className="text-[11px] text-stone-500">{post.author.role}</p>
              </div>
            </div>

            {/* Sharing Bar */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-400 font-medium mr-1">Share:</span>
              <button
                onClick={handleCopyLink}
                className="p-2 rounded-lg bg-white border border-stone-200 text-stone-600 hover:text-emerald-700 hover:border-emerald-500 transition-colors shadow-sm"
                title="Copy Link"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <LinkIcon className="w-4 h-4" />}
              </button>
              <button
                onClick={handleShareWhatsApp}
                className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold hover:bg-emerald-100 transition-colors"
                title="Share on WhatsApp"
              >
                WhatsApp
              </button>
              <button
                onClick={handleShareTwitter}
                className="px-3 py-1.5 rounded-lg bg-stone-100 text-stone-800 text-xs font-semibold hover:bg-stone-200 transition-colors"
                title="Share on X"
              >
                X / Twitter
              </button>
            </div>
          </div>
        </header>

        {/* Hero Photographic Banner */}
        <div className="rounded-3xl overflow-hidden aspect-[16/9] w-full bg-stone-200 shadow-xl border-4 border-white mb-10">
          <ImageWithFallback
            src={post.coverImage}
            alt={post.altText}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Executive Summary / Key Takeaways Box */}
        {post.keyTakeaways && post.keyTakeaways.length > 0 && (
          <div className="bg-emerald-900 text-white rounded-2xl p-6 sm:p-8 mb-10 shadow-lg">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Key Takeaways at a Glance</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              {post.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold shrink-0 mt-0.5">✓</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Article Body Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-sm space-y-10 prose-stone max-w-none">
          {post.sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                {section.heading}
              </h2>

              <div className="space-y-3 text-stone-700 text-sm sm:text-base leading-relaxed">
                {section.content.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {section.tips && section.tips.length > 0 && (
                <div className="mt-4 p-4 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-1.5 text-xs text-stone-700">
                  <strong className="text-emerald-800 block text-xs uppercase tracking-wider">
                    Practical Kitchen Rule:
                  </strong>
                  <ul className="list-disc pl-4 space-y-1">
                    {section.tips.map((tip, tIdx) => (
                      <li key={tIdx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ))}

          {/* Internal Link to Grocery Category */}
          {post.relatedCategorySlug && (
            <div className="p-6 bg-gradient-to-r from-emerald-50 to-stone-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8">
              <div>
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                  Shop Associated Groceries
                </span>
                <h4 className="text-sm font-bold text-stone-900 mt-0.5">
                  Stock your pantry with ingredients featured in this guide
                </h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  Explore fresh items in {post.relatedCategoryName || 'our catalog'}
                </p>
              </div>

              <button
                onClick={() => onNavigateCategory && onNavigateCategory(post.relatedCategorySlug!)}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shrink-0 shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Shop {post.relatedCategoryName}</span>
              </button>
            </div>
          )}

          {/* Tags */}
          <div className="pt-6 border-t border-stone-100 flex flex-wrap items-center gap-2">
            <span className="text-xs text-stone-400 font-semibold mr-1">Tags:</span>
            {post.tags.map(tag => (
              <span key={tag} className="text-xs bg-stone-100 text-stone-600 px-3 py-1 rounded-full font-medium">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Related Articles Strip */}
        {relatedArticles.length > 0 && (
          <div className="mt-14 pt-10 border-t border-stone-200">
            <h3 className="text-xl font-bold text-stone-900 mb-6">
              Related Articles & Reading
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map(rel => (
                <div
                  key={rel.id}
                  onClick={() => onSelectArticle(rel.slug)}
                  className="bg-white rounded-2xl border border-stone-200 p-4 hover:shadow-md hover:border-emerald-500 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[16/10] w-full rounded-xl overflow-hidden mb-3 bg-stone-100">
                      <ImageWithFallback
                        src={rel.coverImage}
                        alt={rel.altText}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                      {rel.category}
                    </span>
                    <h4 className="text-xs font-bold text-stone-900 line-clamp-2 group-hover:text-emerald-700 transition-colors">
                      {rel.title}
                    </h4>
                  </div>
                  <span className="text-[11px] text-stone-400 mt-3 pt-2 border-t border-stone-100 block">
                    {rel.readTime}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </article>
  );
};
