"use client";

import { motion } from "motion/react";
import { Check, Info } from "@phosphor-icons/react/dist/ssr";

const specs = [
  {
    name: "Sport Edition",
    price: "2.490.000đ",
    description: "Lựa chọn hoàn hảo cho người mới bắt đầu theo dõi sức khỏe.",
    color: "emerald",
    features: [
      { label: "Chất liệu", value: "Polycarbonate + kính cường lực" },
      { label: "Màn hình", value: "1.3\" AMOLED, 360x360px" },
      { label: "Thời lượng pin", value: "5 ngày / lần sạc" },
      { label: "Kháng nước", value: "5ATM (rửa tay, mưa)" },
      { label: "Cảm biến", value: "PPG, SpO2, gia tốc kế" },
      { label: "Định vị GPS", value: "Kết nối qua điện thoại", highlight: false },
      { label: "Kết nối", value: "Bluetooth 5.3" },
      { label: "Kích thước mặt", value: "42mm" },
      { label: "Trọng lượng", value: "32g" },
    ],
  },
  {
    name: "Pro Edition",
    price: "4.990.000đ",
    description: "Dành cho người tập chuyên nghiệp cần đo đạc chuyên sâu.",
    color: "amber",
    features: [
      { label: "Chất liệu", value: "Titanium + kính Sapphire", highlight: true },
      { label: "Màn hình", value: "1.47\" AMOLED, 410x502px", highlight: true },
      { label: "Thời lượng pin", value: "7 ngày / lần sạc", highlight: true },
      { label: "Kháng nước", value: "10ATM (bơi lội)", highlight: true },
      { label: "Cảm biến", value: "PPG, SpO2, EKG, nhiệt độ da", highlight: true },
      { label: "Định vị GPS", value: "GPS tích hợp độc lập", highlight: true },
      { label: "Kết nối", value: "Bluetooth 5.3 + Wi-Fi", highlight: true },
      { label: "Kích thước mặt", value: "42mm / 46mm" },
      { label: "Trọng lượng", value: "38g / 42g" },
    ],
  },
];

export function SpecsSection() {
  return (
    <section id="specs" className="py-20 lg:py-28 bg-midnight text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-4"
          >
            Thông số kỹ thuật
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-400"
          >
            So sánh chi tiết hai phiên bản để tìm ra chiếc VitaWatch phù hợp nhất với bạn.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {specs.map((spec, idx) => (
            <motion.div
              key={spec.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative bg-gray-900 rounded-3xl p-8 border ${
                spec.color === "amber" ? "border-amber-500/30 shadow-[0_0_40px_-15px_rgba(245,158,11,0.2)]" : "border-gray-800"
              }`}
            >
              {spec.color === "amber" && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-white text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full">
                  Khuyên dùng
                </div>
              )}
              
              <div className="mb-8 text-center pb-8 border-b border-gray-800">
                <h3 className="text-2xl font-heading font-bold mb-2">{spec.name}</h3>
                <p className="text-gray-400 text-sm mb-6 min-h-[40px]">{spec.description}</p>
                <div className="text-4xl font-bold text-white mb-2">
                  {spec.price}
                </div>
              </div>
              
              <ul className="space-y-4">
                {spec.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check 
                      size={20} 
                      className={`shrink-0 mt-0.5 ${feature.highlight ? "text-amber-400" : "text-emerald-500"}`} 
                      weight="bold" 
                    />
                    <div className="flex-1">
                      <span className="text-gray-400 text-sm block mb-1">{feature.label}</span>
                      <span className={`text-base font-medium ${feature.highlight ? "text-white" : "text-gray-200"}`}>
                        {feature.value}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
