export interface Product {
  id: string;
  name: string;
  hindiName?: string;
  category: string;
  subCategory?: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  unit: string;
  image: string;
  altText: string;
  description: string;
  origin?: string;
  shelfLife?: string;
  storage?: string;
  isOrganic?: boolean;
  isSeasonal?: boolean;
  isBestSeller?: boolean;
  isOffer?: boolean;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
  nutrition?: {
    calories?: string;
    protein?: string;
    carbs?: string;
    fat?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  category: 'Healthy Eating' | 'Grocery Tips' | 'Recipes' | 'Food Storage' | 'Budget Shopping' | 'Sustainability';
  tags: string[];
  coverImage: string;
  altText: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  publishedDate: string;
  readTime: string;
  featured?: boolean;
  relatedCategorySlug?: string;
  relatedCategoryName?: string;
  sections: {
    heading: string;
    content: string[];
    tips?: string[];
  }[];
  keyTakeaways: string[];
}

export interface Recipe {
  id: string;
  title: string;
  hindiTitle?: string;
  description: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  category: string;
  image: string;
  productIds: string[];
  instructions: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  quote: string;
  rating: number;
  verifiedTag: string;
  avatar: string;
}

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  customerName: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  pincode: string;
  deliverySlot: string;
  paymentMethod: string;
  orderDate: string;
}
