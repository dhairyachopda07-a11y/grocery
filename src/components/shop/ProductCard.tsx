import React from 'react';
import { Heart, Plus, Minus, Star, Check } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface ProductCardProps {
  product: Product;
  onSelect?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { cart, addToCart, updateQuantity, isInWishlist, toggleWishlist, setSelectedProduct } = useCart();

  const cartItem = cart.find(item => item.product.id === product.id);
  const inCartQty = cartItem ? cartItem.quantity : 0;
  const isWishlisted = isInWishlist(product.id);

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(product);
    } else {
      setSelectedProduct(product);
    }
  };

  return (
    <article className="group bg-white rounded-2xl border border-stone-200/80 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
      {/* Image Container with Badges */}
      <div className="relative aspect-square w-full bg-stone-100 overflow-hidden cursor-pointer" onClick={handleCardClick}>
        <ImageWithFallback
          src={product.image}
          alt={product.altText}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Discount Badge */}
        {product.discountPercentage && product.discountPercentage > 0 && (
          <div className="absolute top-2.5 left-2.5 bg-emerald-700 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-sm">
            {product.discountPercentage}% OFF
          </div>
        )}

        {/* Seasonal / Best Seller Tag */}
        {product.isSeasonal && (
          <div className="absolute top-2.5 right-11 bg-amber-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-sm">
            Seasonal
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-sm ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600'
              : 'bg-white/90 text-stone-600 hover:text-rose-600 hover:bg-white'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Unit */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span className="uppercase tracking-wider font-medium text-[10px] text-stone-400">
              {product.subCategory || product.category}
            </span>
            <span className="font-medium text-stone-600">{product.unit}</span>
          </div>

          {/* Product Name */}
          <h3 
            onClick={handleCardClick}
            className="text-sm font-semibold text-stone-900 group-hover:text-emerald-700 transition-colors line-clamp-1 cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Hindi / Regional subtitle */}
          {product.hindiName && (
            <p className="text-[11px] text-stone-400 font-normal line-clamp-1 mt-0.5">
              {product.hindiName}
            </p>
          )}

          {/* Sample Rating */}
          <div className="flex items-center gap-1.5 mt-2 text-xs text-stone-500">
            <span className="inline-flex items-center gap-0.5 bg-emerald-50 text-emerald-800 font-semibold px-1.5 py-0.5 rounded text-[11px]">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {product.rating}
            </span>
            <span className="text-[11px] text-stone-400">({product.reviewCount})</span>
          </div>
        </div>

        {/* Price & Action Button */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-stone-900 tabular-nums">
                ₹{product.price}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-stone-400 line-through tabular-nums">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-stone-400">Inclusive of all taxes</span>
          </div>

          {/* Quantity Controls / Add Button */}
          {inCartQty > 0 ? (
            <div className="flex items-center bg-emerald-700 text-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateQuantity(product.id, inCartQty - 1);
                }}
                className="w-7 h-7 flex items-center justify-center hover:bg-emerald-800 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-6 text-center text-xs font-bold tabular-nums">
                {inCartQty}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateQuantity(product.id, inCartQty + 1);
                }}
                className="w-7 h-7 flex items-center justify-center hover:bg-emerald-800 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="px-3.5 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-all duration-200 shadow-sm"
              aria-label={`Add ${product.name} to basket`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
