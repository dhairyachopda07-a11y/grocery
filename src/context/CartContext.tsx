import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, OrderDetails } from '../types';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  amountNeededForFreeDelivery: number;
  couponCode: string;
  appliedCoupon: string | null;
  discountAmount: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  finalTotal: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // UI States
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  
  // Location
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  pincode: string;
  setPincode: (pin: string) => void;

  // Search query
  globalSearch: string;
  setGlobalSearch: (q: string) => void;

  // Toasts
  toasts: Toast[];
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  // Order history / state
  lastOrder: OrderDetails | null;
  setLastOrder: (order: OrderDetails | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load persistent cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('freshbasket_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Load persistent wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('freshbasket_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedCity, setSelectedCity] = useState<string>('Bengaluru (Indiranagar)');
  const [pincode, setPincode] = useState<string>('560038');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [couponCode, setCouponCode] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [globalSearch, setGlobalSearch] = useState<string>('');
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [lastOrder, setLastOrder] = useState<OrderDetails | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('freshbasket_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('freshbasket_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3200);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    addToast(`Added "${product.name}" to your basket.`);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const item = prev.find((i) => i.product.id === productId);
      if (item) {
        addToast(`Removed "${item.product.name}" from basket.`, 'info');
      }
      return prev.filter((i) => i.product.id !== productId);
    });
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setDiscountAmount(0);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        addToast('Removed item from your wishlist.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        addToast('Added item to your wishlist ❤️', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeDeliveryThreshold = 499;
  const deliveryFee = subtotal >= freeDeliveryThreshold || subtotal === 0 ? 0 : 35;
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  // Recalculate discount if coupon applied
  useEffect(() => {
    if (appliedCoupon === 'FRESH100') {
      if (subtotal >= 400) {
        setDiscountAmount(100);
      } else {
        setDiscountAmount(0);
        setAppliedCoupon(null);
      }
    } else if (appliedCoupon === 'WELCOME50') {
      setDiscountAmount(50);
    } else if (appliedCoupon === 'HEALTH10') {
      setDiscountAmount(Math.round(subtotal * 0.1));
    }
  }, [subtotal, appliedCoupon]);

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'FRESH100') {
      if (subtotal < 400) {
        return { success: false, message: 'Minimum cart value of ₹400 required for FRESH100.' };
      }
      setAppliedCoupon('FRESH100');
      setDiscountAmount(100);
      addToast('Coupon FRESH100 applied! You saved ₹100.');
      return { success: true, message: 'Coupon applied! ₹100 deducted.' };
    }
    if (clean === 'WELCOME50') {
      setAppliedCoupon('WELCOME50');
      setDiscountAmount(50);
      addToast('Coupon WELCOME50 applied! You saved ₹50.');
      return { success: true, message: 'Coupon applied! ₹50 deducted.' };
    }
    if (clean === 'HEALTH10') {
      setAppliedCoupon('HEALTH10');
      setDiscountAmount(Math.round(subtotal * 0.1));
      addToast('Coupon HEALTH10 applied! 10% off your basket.');
      return { success: true, message: '10% discount applied!' };
    }
    return { success: false, message: 'Invalid coupon code. Try FRESH100 or WELCOME50.' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
    addToast('Coupon removed.', 'info');
  };

  const finalTotal = Math.max(0, subtotal + deliveryFee - discountAmount);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        subtotal,
        deliveryFee,
        freeDeliveryThreshold,
        amountNeededForFreeDelivery,
        couponCode,
        appliedCoupon,
        discountAmount,
        applyCoupon,
        removeCoupon,
        finalTotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        selectedProduct,
        setSelectedProduct,
        selectedCity,
        setSelectedCity,
        pincode,
        setPincode,
        globalSearch,
        setGlobalSearch,
        toasts,
        addToast,
        removeToast,
        lastOrder,
        setLastOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
