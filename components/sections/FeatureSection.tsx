"use client";

import { motion } from "motion/react";
import { Heartbeat, Moon, Brain, PersonSimpleRun } from "@phosphor-icons/react/dist/ssr";

const features = [
  {
    icon: <Heartbeat size={32} weight="duotone" className="text-emerald-500" />,
    title: "Nhịp tim & SpO2 24/7",
    description:
      "Cảm biến PPG theo dõi liên tục, cảnh báo tức thì khi phát hiện nhịp tim bất thường hoặc SpO2 giảm dưới ngưỡng an toàn.",
  },
  {
    icon: <Moon size={32} weight="duotone" className="text-indigo-500" />,
    title: "Phân tích giấc ngủ",
    description:
      "Theo dõi các giai đoạn Thức – Nhẹ – Sâu – REM xuyên suốt đêm, chấm điểm chất lượng giấc ngủ mỗi sáng kèm gợi ý cải thiện.",
  },
  {
    icon: <Brain size={32} weight="duotone" className="text-amber-500" />,
    title: "AI gợi ý cá nhân hoá",
    description:
      "Mỗi sáng, AI phân tích dữ liệu đêm qua và đưa ra đánh giá: 'Hôm nay bạn sẵn sàng tập luyện' hay 'Nên nghỉ ngơi thêm'.",
  },
  {
    icon: <PersonSimpleRun size={32} weight="duotone" className="text-sky-500" />,
    title: "Theo dõi vận động",
    description:
      "GPS tích hợp ghi lại lộ trình chạy bộ / đạp xe, đếm bước chân, tính calo tiêu thụ, nhắc đứng dậy khi ngồi quá 1 tiếng.",
  },
];

export function FeatureSection() {
  return (
    <section id="features" className="py-20 lg:py-28 bg-slate-50 dark:bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-4 text-slate-900 dark:text-white"
          >
            Đồng hành mọi khoảnh khắc
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-gray-400"
          >
            Công nghệ cảm biến tiên tiến kết hợp AI, mang đến bức tranh sức khỏe toàn diện.
          </motion.p>
        </div>

        {/* 2x2 Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
              }}
              className="bg-white dark:bg-gray-800/50 border border-slate-200/60 dark:border-gray-700/60 rounded-2xl p-8 hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-gray-900 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-heading font-bold mb-3 text-slate-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
