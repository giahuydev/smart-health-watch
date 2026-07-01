"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsletterSchema, type NewsletterFormValues } from "@/lib/validations";
import { Button } from "@/components/ui/Button";
import { toast } from "react-hot-toast";

export function NewsletterSection() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("API Error");

      toast.success("Đăng ký thành công! Chúng tôi sẽ liên hệ bạn sớm.");
      reset();
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 relative px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-gradient-to-br from-emerald-50/80 to-teal-100/50 dark:from-emerald-900/20 dark:to-teal-900/10 backdrop-blur-xl border border-emerald-200/50 dark:border-emerald-800/50 shadow-2xl shadow-emerald-500/5 rounded-[2.5rem] p-10 sm:p-14 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden transition-transform duration-500 hover:scale-[1.01]">
        
        {/* Left Side: Text */}
        <div className="flex-1 text-center lg:text-left relative z-10">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold tracking-tight text-slate-900 dark:text-white mb-3">
            Sẵn sàng bứt phá?
          </h2>
          <p className="text-slate-600 dark:text-gray-300 text-lg max-w-lg mx-auto lg:mx-0">
            Đăng ký email ngay để nhận vé ưu tiên đặt trước VitaWatch AI và nhận <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">Voucher giảm 30%</strong> duy nhất hôm nay.
          </p>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-auto relative z-10">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3 relative w-full sm:w-[450px]">
            <input
              type="email"
              placeholder="Nhập email của bạn..."
              {...register("email")}
              disabled={isLoading}
              className="flex-1 px-6 py-4 rounded-full border border-white dark:border-gray-700 bg-white dark:bg-black/40 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 transition-all shadow-sm"
            />
            <Button variant="primary" type="submit" disabled={isLoading} className="w-full sm:w-auto shrink-0 rounded-full px-8 py-4 h-auto text-base shadow-md">
              {isLoading ? "Đang gửi..." : "Nhận ưu đãi"}
            </Button>
            {errors.email && (
              <p className="text-red-500 dark:text-red-400 font-medium text-sm text-center sm:text-left absolute -bottom-8 w-full px-4">
                {errors.email.message}
              </p>
            )}
          </form>
        </div>
        
      </div>
    </section>
  );
}
