"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useAppStore, type ProductVariant } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { Heart } from "@phosphor-icons/react/dist/ssr";

const PRODUCTS = [
  {
    id: "sport",
    name: "VitaWatch Sport Edition",
    edition: "Sport",
    price: 2490000,
    colors: [
      { id: "obsidian", name: "Xanh", hex: "#1E293B", image: "/images/anhxanh.png" },
      { id: "snow", name: "Xám", hex: "#474d55ff", image: "/images/anhxam.png" },
      { id: "emerald", name: "Xanh Lục", hex: "#10B981", image: "/images/xanhluc.png" },
    ]
  },
  {
    id: "pro",
    name: "VitaWatch Pro Edition",
    edition: "Pro",
    price: 4990000,
    colors: [
      { id: "titanium", name: "Xám", hex: "#474d55ff", image: "/images/anhxam.png" },
      { id: "midnight", name: "Xanh", hex: "#94A3B8", image: "/images/anhxanh.png" },
    ]
  }
];

export function OrderSection() {
  const [selectedEdition, setSelectedEdition] = useState(PRODUCTS[1]); // Default to Pro
  const [selectedColor, setSelectedColor] = useState(PRODUCTS[1].colors[0]);

  const { addToCart, toggleWishlist, wishlist } = useAppStore();

  const handleEditionSelect = (edition: typeof PRODUCTS[0]) => {
    setSelectedEdition(edition);
    setSelectedColor(edition.colors[0]);
  };

  const currentProduct = selectedEdition.colors.find(c => c.id === selectedColor.id) || selectedEdition.colors[0];
  const productVariant = {
    id: `${selectedEdition.id}-${selectedColor.id}`,
    name: selectedEdition.name,
    edition: selectedEdition.edition as "Sport" | "Pro",
    color: selectedColor.name,
    price: selectedEdition.price,
    image: selectedColor.image
  };
  const isWishlisted = wishlist.some(w => w.id === productVariant.id);

  const handleAddToCart = () => {
    const item: ProductVariant = {
      id: currentProductId,
      name: selectedEdition.name,
      edition: selectedEdition.edition as "Sport" | "Pro",
      color: selectedColor.name,
      price: selectedEdition.price,
      image: selectedColor.image,
    };
    addToCart(item);
  };

  return (
    <section id="order" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-4 text-slate-900 dark:text-white"
          >
            Sẵn sàng nâng tầm sức khỏe?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-gray-400"
          >
            Chọn phiên bản VitaWatch phù hợp với phong cách của bạn.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Image Preview */}
          <motion.div
            key={selectedColor.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative bg-snow dark:bg-gray-900 rounded-3xl aspect-square flex items-center justify-center border border-slate-200 dark:border-gray-800 p-8"
          >
            <div className="absolute top-6 right-6">
              <button
                aria-label="Thêm vào yêu thích"
                onClick={() => toggleWishlist(productVariant)}
                className={`p-3 rounded-full bg-white dark:bg-black shadow-sm transition-colors ${isWishlisted ? "text-red-500" : "text-slate-400 hover:text-slate-600 dark:hover:text-gray-300"}`}
              >
                <Heart size={24} weight={isWishlisted ? "fill" : "regular"} />
              </button>
            </div>
            <div className="relative w-full h-full max-w-[260px] max-h-[260px] md:max-w-[340px] md:max-h-[340px]">
              <Image
                src={selectedColor.image}
                alt={`${selectedEdition.name} - ${selectedColor.name}`}
                fill
                sizes="(max-width: 768px) 260px, 340px"
                className="object-contain"
              />
            </div>
          </motion.div>

          {/* Configurator */}
          <div className="flex flex-col gap-10">

            {/* 1. Select Edition */}
            <div>
              <h3 className="text-xl font-heading font-bold mb-4 text-slate-900 dark:text-white">1. Chọn phiên bản</h3>
              <div className="grid grid-cols-2 gap-4">
                {PRODUCTS.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => handleEditionSelect(prod)}
                    className={`flex flex-col p-4 rounded-2xl border-2 text-left transition-all duration-200 ${selectedEdition.id === prod.id
                      ? "border-amber-500 bg-amber-50/50 dark:bg-amber-500/10"
                      : "border-slate-200 dark:border-gray-800 hover:border-slate-300 dark:hover:border-gray-700 bg-white dark:bg-gray-900"
                      }`}
                  >
                    <span className="font-semibold text-slate-900 dark:text-white">{prod.edition}</span>
                    <span className="text-slate-500 dark:text-gray-400 text-sm mt-1">
                      {prod.price.toLocaleString("vi-VN")}đ
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Select Color */}
            <div>
              <h3 className="text-xl font-heading font-bold mb-4 text-slate-900 dark:text-white">
                2. Chọn màu sắc <span className="text-base font-normal text-slate-500 dark:text-gray-400 ml-2">- {selectedColor.name}</span>
              </h3>
              <div className="flex gap-4">
                {selectedEdition.colors.map((color) => (
                  <button
                    key={color.id}
                    aria-label={color.name}
                    title={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-full border-2 transition-all duration-200 p-1 ${selectedColor.id === color.id
                      ? "border-amber-500 scale-110"
                      : "border-transparent hover:scale-105"
                      }`}
                  >
                    <span
                      className="w-full h-full rounded-full block border border-black/10 dark:border-white/10 shadow-sm"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Summary & Action */}
            <div className="pt-8 border-t border-slate-200 dark:border-gray-800">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="text-slate-500 dark:text-gray-400 text-sm mb-1">Tổng cộng</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {selectedEdition.price.toLocaleString("vi-VN")}đ
                  </p>
                </div>
              </div>

              <Button variant="primary" size="lg" className="w-full" onClick={handleAddToCart}>
                Thêm vào giỏ hàng
              </Button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
