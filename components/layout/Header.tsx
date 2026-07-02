"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { List, X, Moon, Sun, ShoppingCart, Heart } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";
import { useAppStore } from "@/lib/store";

function CartBadge() {
  const cart = useAppStore((state) => state.cart);
  if (cart.length === 0) return null;
  return (
    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
      {cart.length}
    </span>
  );
}

function WishlistBadge() {
  const wishlist = useAppStore((state) => state.wishlist);
  if (wishlist.length === 0) return null;
  return (
    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
      {wishlist.length}
    </span>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Tính năng", href: "#features" },
    { name: "Thông số", href: "#specs" },
    { name: "Đặt hàng", href: "#order" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-16 md:h-20 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-slate-200 dark:border-gray-800 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <Link
          href="/"
          className="font-heading font-bold text-2xl tracking-tight flex items-center"
        >
          <span className="bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent mr-1">Vita</span>
          <span className="text-slate-900 dark:text-white transition-colors">
            Watch
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium transition-colors text-slate-600 hover:text-emerald-500 dark:text-gray-300 dark:hover:text-white"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full transition-colors hover:bg-slate-100 dark:hover:bg-gray-800 text-slate-600 dark:text-gray-300"
            aria-label="Toggle theme"
          >
            {mounted && (theme === "dark" ? <Sun size={20} /> : <Moon size={20} />)}
          </button>

          <button
            onClick={() => useAppStore.getState().openSidebar("wishlist")}
            className="p-2 rounded-full transition-colors relative hover:bg-slate-100 dark:hover:bg-gray-800 text-slate-600 dark:text-gray-300"
            aria-label="View wishlist"
          >
            <Heart size={20} />
            <WishlistBadge />
          </button>

          <button
            onClick={() => useAppStore.getState().openSidebar("cart")}
            className="p-2 rounded-full transition-colors relative hover:bg-slate-100 dark:hover:bg-gray-800 text-slate-600 dark:text-gray-300"
            aria-label="View cart"
          >
            <ShoppingCart size={20} />
            <CartBadge />
          </button>

          <Button variant="primary" size="sm" onClick={() => document.getElementById("order")?.scrollIntoView({ behavior: "smooth" })}>
            Đặt trước ngay
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          aria-label="Mở menu"
          className="md:hidden p-2 transition-colors text-slate-600 dark:text-gray-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <List size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-slate-200 dark:border-gray-800 shadow-xl p-4 flex flex-col gap-4">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base font-medium p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-gray-800 text-slate-700 dark:text-gray-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                useAppStore.getState().openSidebar("wishlist");
              }}
              className="w-full flex items-center justify-between text-xl font-heading font-semibold text-slate-900 dark:text-white p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-gray-800"
            >
              <span className="flex items-center gap-3"><Heart size={24} /> Yêu thích</span>
              <WishlistBadge />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                useAppStore.getState().openSidebar("cart");
              }}
              className="w-full flex items-center justify-between text-xl font-heading font-semibold text-slate-900 dark:text-white p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-gray-800"
            >
              <span className="flex items-center gap-3"><ShoppingCart size={24} /> Giỏ hàng</span>
              <CartBadge />
            </button>
          </nav>
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-gray-800">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-3 flex items-center gap-3 rounded-lg hover:bg-slate-50 dark:hover:bg-gray-800 text-slate-700 dark:text-gray-200 w-full"
            >
              {mounted && (theme === "dark" ? <Sun size={20} /> : <Moon size={20} />)}
              <span className="font-medium">Đổi giao diện</span>
            </button>
          </div>
          <Button variant="primary" className="w-full justify-center mt-2">
            Đặt trước ngay
          </Button>
        </div>
      )}
    </header>
  );
}
