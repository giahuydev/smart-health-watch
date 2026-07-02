"use client";

import { useAppStore } from "@/lib/store";
import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingCart, Trash } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export function CartSidebar() {
  const { cart, isCartOpen, toggleCart, removeFromCart } = useAppStore();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl z-[101] flex flex-col border-l border-slate-200 dark:border-gray-800"
          >
            <div className="p-6 flex items-center justify-between border-b border-slate-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <ShoppingCart size={24} weight="duotone" className="text-amber-500" />
                <h2 className="text-xl font-heading font-bold">Giỏ hàng của bạn</h2>
              </div>
              <button
                aria-label="Đóng giỏ hàng"
                onClick={toggleCart}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4 text-slate-500 dark:text-gray-400">
                  <ShoppingCart size={48} weight="thin" />
                  <p>Giỏ hàng đang trống.<br/>Hãy chọn một phiên bản VitaWatch nhé!</p>
                  <Button variant="outline" onClick={toggleCart} className="mt-4">
                    Tiếp tục xem
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {cart.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="flex gap-4 items-center bg-slate-50 dark:bg-gray-800/50 p-4 rounded-2xl">
                      <div className="relative w-20 h-20 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shrink-0 border border-slate-200 dark:border-gray-700 p-2 overflow-hidden">
                        <Image src={item.image} alt={item.name} fill sizes="80px" className="object-contain p-2" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading font-semibold text-slate-900 dark:text-white truncate">
                          {item.name}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-gray-400 mb-1">
                          Màu: {item.color}
                        </p>
                        <p className="font-medium text-amber-600 dark:text-amber-500">
                          {item.price.toLocaleString("vi-VN")}đ
                        </p>
                      </div>
                      <button 
                        aria-label="Xóa sản phẩm"
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-full transition-colors"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-900">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-slate-600 dark:text-gray-400 font-medium">Tổng tạm tính</span>
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">
                    {total.toLocaleString("vi-VN")}đ
                  </span>
                </div>
                <Button variant="primary" className="w-full" size="lg">
                  Tiến hành thanh toán
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
