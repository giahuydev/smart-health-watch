"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-[100dvh] flex items-center pt-24 pb-12 overflow-hidden">
      {/* Background gradients for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 dark:from-emerald-900/20 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-start gap-6 max-w-xl"
          >
            <div className="inline-flex items-center rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              Ra mắt 2026
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-slate-900 dark:text-white leading-[1.1] tracking-tight">
              Sức khỏe thông minh, ngay trên cổ tay bạn
            </h1>
            
            <p className="text-lg text-slate-600 dark:text-gray-300 leading-relaxed max-w-[30ch]">
              VitaWatch AI theo dõi nhịp tim, SpO2 và giấc ngủ 24/7. Trí tuệ nhân tạo phân tích dữ liệu mỗi ngày, giúp bạn hiểu cơ thể và sống khỏe hơn.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
              <Button 
                variant="primary" 
                size="lg" 
                className="w-full sm:w-auto"
                onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Đặt trước ngay
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto text-slate-700 dark:text-white"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Khám phá tính năng
              </Button>
            </div>
            
            <div className="flex items-center gap-4 mt-6 pt-6 border-t border-slate-200 dark:border-gray-800/50 w-full">
              <div className="flex -space-x-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-slate-100 dark:bg-gray-800 border-2 border-white dark:border-slate-900 flex items-center justify-center overflow-hidden">
                     <Image src={`https://picsum.photos/seed/user${i}/100/100`} width={40} height={40} alt="User" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-500 dark:text-gray-400 font-medium">
                <strong className="text-slate-900 dark:text-white">10,000+</strong> người đã đặt trước
              </p>
            </div>
          </motion.div>
          
          {/* Right: Image with Parallax & Aura Glow */}
          <motion.div 
            style={{ y, opacity }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative h-[400px] md:h-[550px] lg:h-[650px] w-full flex items-center justify-center"
          >
            {/* Aura Glow Effect */}
            <div className="absolute inset-0 bg-emerald-500/30 dark:bg-teal-400/30 blur-[100px] rounded-full scale-[0.85] transform -z-10 transition-opacity duration-700" />
            
            <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] lg:w-[460px] lg:h-[460px]">
              <Image 
                src="/images/anhchinh.png" 
                alt="VitaWatch AI Smartwatch" 
                fill
                priority
                sizes="(max-width: 768px) 280px, (max-width: 1024px) 400px, 460px"
                className="object-contain drop-shadow-2xl scale-100"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
