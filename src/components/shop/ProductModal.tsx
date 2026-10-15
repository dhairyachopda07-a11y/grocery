import React from 'react';
import { X, Heart, Plus, Minus, Star, Truck, ShieldCheck, Check, ArrowRight } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onNavigateToCategory?: (categorySlug: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ 
  product, 
  onClose,
  onNavigateToCategory 
}) => {
  const { cart, addToCart, updateQuantity, isInWishlist, toggleWishlist, setIsCartOpen } = useCart();

  const cartItem = cart.find(item => item.product.id === product.id);
  const inCartQty = cartItem ? cartItem.quantity : 0;
  const isWishlisted = isInWishlist(product.id);

  // Inject Schema.org Product structured data
  React.useEffect(() => {
    const scriptId = 'product-schema-jsonld';
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = scriptId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      'name': product.name,
      'image': [product.image],
      'description': product.description,
      'offers': {
        '@type': 'Offer',
        'price': product.price,
        'priceCurrency': 'INR',
        'availability': product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
      }
    });

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [product]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
      <div 
        className="relative bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-stone-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 text-stone-500 hover:text-stone-900 hover:bg-white shadow-md flex items-center justify-center transition-colors"
          aria-label="Close product details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Photograph */}
          <div className="relative aspect-square md:aspect-auto bg-stone-100 flex items-center justify-center p-6">
            <ImageWithFallback
              src={product.image}
              alt={product.altText}
              className="w-full h-full object-cover rounded-2xl shadow-inner max-h-[380px]"
            />
            {product.discountPercentage && product.discountPercentage > 0 && (
              <span className="absolute top-6 left-6 bg-emerald-700 text-white text-xs font-bold px-2.5 py-1 rounded shadow">
                {product.discountPercentage}% OFF
              </span>
            )}
          </div>

          {/* Right Column: Details & Contiguous Purchase Module */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category Breadcrumb */}
              <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5">
                <button
                  onClick={() => {
                    if (onNavigateToCategory) onNavigateToCategory(product.category);
                    onClose();
                  }}
                  className="uppercase tracking-wider font-semibold text-emerald-700 hover:underline"
                >
                  {product.category.replace('-', ' & ')}
                </button>
                <span>·</span>
                <span>{product.unit}</span>
              </div>

              {/* Title & Regional Name */}
              <h2 className="text-xl md:text-2xl font-bold text-stone-900 leading-snug">
                {product.name}
              </h2>
              {product.hindiName && (
                <p className="text-sm font-medium text-stone-500 mt-0.5">
                  {product.hindiName}
                </p>
              )}

              {/* Sample Rating & Stock Indicator */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1 bg-emerald-50 text-emerald-800 text-xs font-semibold px-2 py-0.5 rounded">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-xs text-stone-500">
                  {product.reviewCount} customer ratings (demo)
                </span>
                <span className="text-xs font-medium text-emerald-700 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> In Stock
                </span>
              </div>

              {/* Price Row */}
              <div className="mt-4 flex items-baseline gap-2.5">
                <span className="text-3xl font-extrabold text-stone-900 tabular-nums">
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-stone-400 line-through tabular-nums">
                    ₹{product.originalPrice}
                  </span>
                )}
                <span className="text-xs text-stone-500 font-medium">
                  ({product.unit})
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-stone-600 mt-3 leading-relaxed">
                {product.description}
              </p>

              {/* Metadata Pillows */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] bg-stone-50 p-3 rounded-xl border border-stone-100">
                {product.origin && (
                  <div>
                    <span className="text-stone-400 block font-medium">Origin:</span>
                    <span className="text-stone-800 font-semibold">{product.origin}</span>
                  </div>
                )}
                {product.shelfLife && (
                  <div>
                    <span className="text-stone-400 block font-medium">Shelf Life:</span>
                    <span className="text-stone-800 font-semibold">{product.shelfLife}</span>
                  </div>
                )}
              </div>

              {/* Storage recommendation */}
              {product.storage && (
                <p className="text-[11px] text-stone-500 mt-2.5 bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100">
                  💡 <strong className="text-emerald-900">Storage Tip:</strong> {product.storage}
                </p>
              )}

              {/* Nutrition Mini Matrix */}
              {product.nutrition && (
                <div className="mt-3">
                  <span className="text-[11px] font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                    Nutritional Highlights
                  </span>
                  <div className="grid grid-cols-4 gap-1.5 text-center text-[10px]">
                    <div className="bg-stone-100 p-1.5 rounded">
                      <span className="text-stone-400 block">Energy</span>
                      <strong className="text-stone-800">{product.nutrition.calories}</strong>
                    </div>
                    <div className="bg-stone-100 p-1.5 rounded">
                      <span className="text-stone-400 block">Protein</span>
                      <strong className="text-stone-800">{product.nutrition.protein}</strong>
                    </div>
                    <div className="bg-stone-100 p-1.5 rounded">
                      <span className="text-stone-400 block">Carbs</span>
                      <strong className="text-stone-800">{product.nutrition.carbs}</strong>
                    </div>
                    <div className="bg-stone-100 p-1.5 rounded">
                      <span className="text-stone-400 block">Fat</span>
                      <strong className="text-stone-800">{product.nutrition.fat}</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Purchase CTA Strip */}
            <div className="pt-4 border-t border-stone-200 flex items-center gap-3">
              {inCartQty > 0 ? (
                <div className="flex-1 flex items-center justify-between bg-emerald-700 text-white rounded-xl p-1.5 px-3">
                  <span className="text-xs font-semibold">In Basket ({inCartQty})</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(product.id, inCartQty - 1)}
                      className="w-7 h-7 rounded bg-emerald-800 hover:bg-emerald-900 flex items-center justify-center"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-bold w-6 text-center tabular-nums">{inCartQty}</span>
                    <button
                      onClick={() => updateQuantity(product.id, inCartQty + 1)}
                      className="w-7 h-7 rounded bg-emerald-800 hover:bg-emerald-900 flex items-center justify-center"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 py-3 px-6 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add to Basket · ₹{product.price}</span>
                </button>
              )}

              {/* Wishlist toggle */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 rounded-xl border transition-colors ${
                  isWishlisted
                    ? 'border-rose-300 bg-rose-50 text-rose-600'
                    : 'border-stone-200 text-stone-600 hover:border-rose-300 hover:text-rose-600'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
