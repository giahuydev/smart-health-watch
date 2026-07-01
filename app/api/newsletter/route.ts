import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = newsletterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Dữ liệu không hợp lệ", details: result.error.errors },
        { status: 400 }
      );
    }

    const { email } = result.data;

    // 1. Lưu vào Supabase (Bỏ qua lỗi duplicate nếu đã đăng ký)
    const { error: supabaseError } = await supabase
      .from("subscribers")
      .insert([{ email }]);

    if (supabaseError && supabaseError.code !== "23505") { // 23505 = unique_violation
      console.error("Supabase Error:", supabaseError);
      return NextResponse.json({ error: "Lỗi server khi lưu trữ" }, { status: 500 });
    }

    // 2. Forward sang Webhook (nếu có)
    const webhookUrl = process.env.WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ event: "new_subscriber", email }),
        });
      } catch (err) {
        console.error("Webhook Error:", err);
        // Không block flow nếu webhook lỗi
      }
    }

    return NextResponse.json({ success: true, message: "Đăng ký thành công" });
  } catch (error) {
    console.error("Newsletter API Error:", error);
    return NextResponse.json({ error: "Lỗi server không xác định" }, { status: 500 });
  }
}
