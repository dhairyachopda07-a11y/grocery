import React, { useState, useMemo } from 'react';
import { Search, Clock, Calendar, ArrowRight, User, BookOpen, Tag } from 'lucide-react';
import { BLOG_POSTS } from '../../data/blogs';
import { BlogPost } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface BlogListingPageProps {
  onSelectArticle: (slug: string) => void;
  onNavigateHome: () => void;
}

const CATEGORIES = [
  'All',
  'Healthy Eating',
  'Grocery Tips',
  'Recipes',
  'Food Storage',
  'Budget Shopping',
  'Sustainability'
];

export const BlogListingPage: React.FC<BlogListingPageProps> = ({ 
  onSelectArticle,
  onNavigateHome 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Featured article is the first one or one with featured=true
  const featuredArticle = BLOG_POSTS.find(p => p.featured) || BLOG_POSTS[0];

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      if (selectedCategory !== 'All' && post.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = post.title.toLowerCase().includes(q);
        const matchExcerpt = post.excerpt.toLowerCase().includes(q);
        const matchTag = post.tags.some(t => t.toLowerCase().includes(q));
        if (!matchTitle && !matchExcerpt && !matchTag) return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="py-10 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-stone-500 mb-6 flex items-center gap-1.5">
          <button onClick={onNavigateHome} className="hover:text-emerald-700">Home</button>
          <span>/</span>
          <span className="font-semibold text-stone-800">Kanchan Super Market Journal & Guides</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
            Food Wisdom · Storage Science · Everyday Recipes
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            The Kanchan Super Market Journal
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Expert practical guides crafted by nutritionists, agriculturalists, and home chefs to help you get the most out of every rupee and vegetable in your kitchen.
          </p>
        </div>

        {/* Featured Article Card (at top) */}
        {selectedCategory === 'All' && !searchQuery.trim() && (
          <div 
            onClick={() => onSelectArticle(featuredArticle.slug)}
            className="mb-14 bg-white rounded-3xl border border-stone-200/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group grid grid-cols-1 lg:grid-cols-12"
          >
            <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto relative bg-stone-100 overflow-hidden">
              <ImageWithFallback
                src={featuredArticle.coverImage}
                alt={featuredArticle.altText}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <span className="absolute top-4 left-4 bg-emerald-700 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow">
                Featured Editorial
              </span>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-stone-400">
                  <span className="font-semibold text-emerald-700">{featuredArticle.category}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {featuredArticle.publishedDate}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredArticle.readTime}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-emerald-700 transition-colors leading-snug">
                  {featuredArticle.title}
                </h2>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                <div className="text-xs">
                  <p className="font-bold text-stone-900">{featuredArticle.author.name}</p>
                  <p className="text-[11px] text-stone-400">{featuredArticle.author.role}</p>
                </div>
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Full Guide →
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Search & Category Filter Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto py-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search 12 guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600 focus:bg-white"
            />
          </div>

        </div>

        {/* Articles Grid (12 articles available) */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 space-y-3">
            <BookOpen className="w-10 h-10 text-stone-300 mx-auto" />
            <h3 className="text-base font-bold text-stone-800">No matching articles found</h3>
            <p className="text-xs text-stone-500">Try selecting "All" or adjusting your search keywords.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-emerald-700 text-white text-xs font-semibold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => onSelectArticle(post.slug)}
                className="group cursor-pointer bg-white rounded-3xl border border-stone-200/80 overflow-hidden hover:shadow-xl hover:border-emerald-500 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Cover Photo */}
                <div className="aspect-[16/10] w-full bg-stone-100 overflow-hidden relative">
                  <ImageWithFallback
                    src={post.coverImage}
                    alt={post.altText}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-stone-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                    {post.category}
                  </div>
                </div>

                {/* Article Info */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Meta */}
                    <div className="flex items-center gap-2 text-[11px] text-stone-400 mb-2">
                      <span>{post.publishedDate}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs text-stone-600 line-clamp-3 mt-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-500 font-medium text-[11px]">By {post.author.name}</span>
                    <span className="font-bold text-emerald-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Read Guide →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
