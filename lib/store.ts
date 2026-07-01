import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ProductVariant = {
  id: string;
  name: string;
  edition: "Sport" | "Pro";
  color: string;
  price: number;
  image: string;
};

interface AppState {
  // Cart
  cart: ProductVariant[];
  isCartOpen: boolean;
  addToCart: (item: ProductVariant) => void;
  removeFromCart: (id: string) => void;
  toggleCart: () => void;
  
  // Wishlist
  wishlist: string[]; // Array of product IDs
  toggleWishlist: (id: string) => void;
  
  // Recently Viewed
  recentlyViewed: ProductVariant[];
  addRecentlyViewed: (item: ProductVariant) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Cart state
      cart: [],
      isCartOpen: false,
      addToCart: (item) => set((state) => {
        import("@/hooks/useTracker").then(({ trackEvent }) => trackEvent("add_to_cart", { product_id: item.id, name: item.name, price: item.price }));
        import("react-hot-toast").then(({ toast }) => toast.success(`Đã thêm ${item.name} vào giỏ hàng!`, {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }));
        return { 
          cart: [...state.cart, item],
          isCartOpen: true 
        };
      }),
      removeFromCart: (id) => set((state) => ({ 
        cart: state.cart.filter(item => item.id !== id) 
      })),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      
      // Wishlist state
      wishlist: [],
      toggleWishlist: (id) => set((state) => ({
        wishlist: state.wishlist.includes(id) 
          ? state.wishlist.filter(wId => wId !== id)
          : [...state.wishlist, id]
      })),
      
      // Recently Viewed state
      recentlyViewed: [],
      addRecentlyViewed: (item) => set((state) => {
        const filtered = state.recentlyViewed.filter(i => i.id !== item.id);
        return {
          recentlyViewed: [item, ...filtered].slice(0, 4) // Keep last 4 items
        };
      }),
    }),
    {
      name: "vitawatch-storage",
    }
  )
);
