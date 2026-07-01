import { NextRequest, NextResponse } from "next/server";

// System prompt chứa toàn bộ thông tin VitaWatch AI
const SYSTEM_PROMPT = `Bạn là trợ lý tư vấn sản phẩm VitaWatch AI — đồng hồ thông minh theo dõi sức khỏe của Healthy Living Corporation.
Trả lời ngắn gọn, thân thiện, bằng tiếng Việt. Tối đa 3-4 câu mỗi lượt.

THÔNG TIN SẢN PHẨM:
- Tên: VitaWatch AI
- Tagline: "Sức khỏe thông minh, ngay trên cổ tay bạn"
- 2 phiên bản: Sport Edition (2.490.000đ) và Pro Edition (4.990.000đ)

Sport Edition: Polycarbonate + kính cường lực, 1.3" AMOLED 360x360px, pin 5 ngày, 5ATM (rửa tay, mưa), cảm biến PPG/SpO2/gia tốc kế, GPS qua điện thoại, Bluetooth 5.3, mặt 42mm, 32g.
Pro Edition: Titanium + kính Sapphire, 1.47" AMOLED 410x502px, pin 7 ngày, 10ATM (bơi lội), cảm biến PPG/SpO2/EKG/nhiệt độ da, GPS tích hợp, Bluetooth 5.3 + Wi-Fi, mặt 42mm/46mm, 38g/42g.

Tính năng chính: Nhịp tim & SpO2 24/7, Phân tích giấc ngủ (Thức-Nhẹ-Sâu-REM), AI gợi ý cá nhân hoá mỗi ngày, GPS theo dõi vận động, nhắc nhở đứng dậy.
App đồng bộ: iOS 15+ / Android 10+.
VitaWatch KHÔNG đo huyết áp, KHÔNG có loa/mic để nghe gọi.

Nếu câu hỏi không liên quan đến VitaWatch hoặc sức khỏe, hãy từ chối nhẹ nhàng và hướng lại về sản phẩm.`;

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Tin nhắn không hợp lệ" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Nếu không có API key, trả về phản hồi tĩnh thông minh
    if (!apiKey) {
      const reply = getStaticReply(message);
      return NextResponse.json({ reply });
    }

    // Gọi Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
            { role: "model", parts: [{ text: "Xin chào! Tôi là trợ lý VitaWatch AI. Bạn muốn tìm hiểu gì về sản phẩm?" }] },
            { role: "user", parts: [{ text: message }] },
          ],
        }),
      }
    );

    if (!response.ok) {
      const reply = getStaticReply(message);
      return NextResponse.json({ reply });
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Xin lỗi, tôi chưa hiểu câu hỏi. Bạn có thể hỏi lại được không?";

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ reply: "Xin lỗi, có lỗi xảy ra. Vui lòng thử lại!" });
  }
}

// Phản hồi tĩnh dựa trên keyword matching khi không có API key
function getStaticReply(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("chống nước") || lower.includes("bơi")) {
    return "VitaWatch Sport chống nước 5ATM (rửa tay, mưa). Phiên bản Pro nâng cấp lên 10ATM, hoàn toàn yên tâm khi bơi lội! 🏊";
  }
  if (lower.includes("pin") || lower.includes("sạc")) {
    return "Sport Edition dùng được 5 ngày/lần sạc, Pro Edition lên đến 7 ngày. Sạc đầy chỉ mất khoảng 1.5 tiếng! 🔋";
  }
  if (lower.includes("giá") || lower.includes("bao nhiêu")) {
    return "Sport Edition: 2.490.000đ — phù hợp người mới. Pro Edition: 4.990.000đ — dành cho ai cần GPS độc lập và cảm biến EKG chuyên sâu.";
  }
  if (lower.includes("phiên bản") || lower.includes("khác")) {
    return "VitaWatch có 2 phiên bản: Sport (2.49tr, Polycarbonate, 5ATM) và Pro (4.99tr, Titanium + Sapphire, 10ATM, EKG, GPS tích hợp). Pro xịn hơn đáng kể!";
  }
  if (lower.includes("huyết áp")) {
    return "Hiện tại VitaWatch AI chưa hỗ trợ đo huyết áp. Tuy nhiên, sản phẩm theo dõi nhịp tim, SpO2, và EKG (bản Pro) rất chính xác!";
  }
  if (lower.includes("apple watch") || lower.includes("so sánh")) {
    return "VitaWatch AI tập trung vào sức khỏe với AI gợi ý cá nhân hoá mỗi ngày — điểm khác biệt lớn. Giá cũng phải chăng hơn nhiều so với Apple Watch!";
  }
  if (lower.includes("đồng bộ") || lower.includes("điện thoại") || lower.includes("app")) {
    return "VitaWatch đồng bộ qua Bluetooth 5.3 (Pro có thêm Wi-Fi). Hỗ trợ iOS 15+ và Android 10+. Cài app VitaWatch trên Store là dùng được ngay!";
  }

  return "Cảm ơn bạn đã quan tâm đến VitaWatch AI! Bạn có thể hỏi tôi về thông số kỹ thuật, giá cả, tính năng, hoặc so sánh giữa 2 phiên bản Sport và Pro nhé.";
}
