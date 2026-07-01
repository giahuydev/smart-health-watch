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

  const onSubmit = async (data: NewsletterFormValues) => {
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
    <section className="py-20 lg:py-28 bg-snow dark:bg-gray-900 border-t border-slate-200 dark:border-gray-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-4 text-slate-900 dark:text-gray-100">
          Đăng ký nhận ưu đãi ra mắt
        </h2>
        <p className="text-lg text-slate-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
          Để lại email, bạn sẽ là người đầu tiên nhận thông tin giá và ưu đãi đặt trước VitaWatch AI.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto flex flex-col gap-2 relative">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="email@cuaban.com"
              {...register("email")}
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all disabled:opacity-50"
            />
            <Button variant="primary" type="submit" disabled={isLoading} className="w-full sm:w-auto shrink-0">
              {isLoading ? "Đang gửi..." : "Đăng ký ngay"}
            </Button>
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm text-left px-2 absolute -bottom-6 left-0">
              {errors.email.message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
