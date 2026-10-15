import React from 'react';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { BLOG_POSTS } from '../../data/blogs';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface FeaturedBlogSectionProps {
  onReadArticle: (slug: string) => void;
  onViewAllBlogs: () => void;
}

export const FeaturedBlogSection: React.FC<FeaturedBlogSectionProps> = ({ 
  onReadArticle, 
  onViewAllBlogs 
}) => {
  const latestArticles = BLOG_POSTS.slice(0, 4);

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
              Fresh Insights & Cooking Guides
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              From the Kanchan Super Market Journal
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Practical guides on healthy eating, pantry storage science, and delicious everyday Indian cooking.
            </p>
          </div>

          <button
            onClick={onViewAllBlogs}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group self-start sm:self-auto"
          >
            <span>View All 12 Articles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestArticles.map((post) => (
            <article
              key={post.id}
              onClick={() => onReadArticle(post.slug)}
              className="group cursor-pointer bg-stone-50 rounded-2xl border border-stone-200/80 overflow-hidden hover:border-emerald-500 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              {/* Cover Photo */}
              <div className="aspect-[16/10] w-full overflow-hidden bg-stone-200 relative">
                <ImageWithFallback
                  src={post.coverImage}
                  alt={post.altText}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm text-stone-800 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                  {post.category}
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  {/* Meta strip */}
                  <div className="flex items-center gap-2 text-[11px] text-stone-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.publishedDate}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-stone-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-2 mt-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs font-semibold text-emerald-700">
                  <span>Read Article</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
