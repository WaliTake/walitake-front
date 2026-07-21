// ─── Core Domain Types ────────────────────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  icon: string; // lucide-react icon name
  color: string; // Tailwind bg class
  textColor: string; // Tailwind text class
  description: string;
}

export interface Business {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  phone: string;
  type: string;
  userId: string;
  logo?: string;
  verified?: boolean;
  rating?: number;
  listingCount?: number;
}

export interface WasteListing {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  quantity: number;
  unit: string;
  price: number; // 0 = free
  originalPrice?: number;
  discountPercent?: number;
  imageUrl: string;
  businessId: string;
  available: boolean;
  createdAt: string;
  featured?: boolean;
  tags?: string[];
  tags_list?: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  businessId?: string;
  avatar?: string;
  joinedAt?: string;
  xp?: number;
}

// ─── UI / State Types ─────────────────────────────────────────────────────────

export interface AuthState {
  user: User | null;
  isLoading: boolean;
}

export interface FilterState {
  search: string;
  categoryId: string;
  city: string;
  priceType: 'all' | 'free' | 'paid';
  sortBy: 'newest' | 'price-asc' | 'price-desc';
}

export type ListingUnit = 'kg' | 'tonelada' | 'litros' | 'piezas' | 'metros' | 'cajas' | 'pallets';

export type BusinessType =
  | 'restaurante'
  | 'fabrica'
  | 'hotel'
  | 'supermercado'
  | 'hospital'
  | 'oficina'
  | 'constructora'
  | 'otro';
