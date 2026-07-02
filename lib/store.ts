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
  activeSidebarTab: "cart" | "wishlist";
  openSidebar: (tab: "cart" | "wishlist") => void;
  setSidebarTab: (tab: "cart" | "wishlist") => void;
  addToCart: (item: ProductVariant) => void;
  removeFromCart: (id: string) => void;
  toggleCart: () => void;
  
  // Wishlist
  wishlist: ProductVariant[]; // Array of products
  toggleWishlist: (item: ProductVariant) => void;
  
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
      activeSidebarTab: "cart",
      openSidebar: (tab) => set({ isCartOpen: true, activeSidebarTab: tab }),
      setSidebarTab: (tab) => set({ activeSidebarTab: tab }),
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
          isCartOpen: true,
          activeSidebarTab: "cart"
        };
      }),
      removeFromCart: (id) => set((state) => ({ 
        cart: state.cart.filter(item => item.id !== id) 
      })),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      
      // Wishlist state
      wishlist: [],
      toggleWishlist: (item) => set((state) => {
        const exists = state.wishlist.some(w => w.id === item.id);
        if (exists) {
          import("react-hot-toast").then(({ toast }) => toast.success(`Đã bỏ lưu ${item.name}`, { style: { borderRadius: '10px', background: '#333', color: '#fff' } }));
          return { wishlist: state.wishlist.filter(w => w.id !== item.id) };
        } else {
          import("@/hooks/useTracker").then(({ trackEvent }) => trackEvent("add_to_wishlist", { product_id: item.id }));
          import("react-hot-toast").then(({ toast }) => toast.success(`Đã lưu ${item.name} vào mục yêu thích!`, { style: { borderRadius: '10px', background: '#333', color: '#fff' } }));
          return { wishlist: [...state.wishlist, item] };
        }
      }),
      
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
