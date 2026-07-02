"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { SunHorizon, PersonSimpleRun, BellRinging, Moon } from "@phosphor-icons/react/dist/ssr";

const milestones = [
  {
    time: "6:00",
    period: "sáng",
    icon: <SunHorizon size={28} weight="duotone" className="text-amber-500" />,
    title: "Thức dậy cùng điểm giấc ngủ",
    description: "Ngay khi mở mắt, VitaWatch hiển thị điểm giấc ngủ đêm qua (VD: 82/100). AI gợi ý: \"Giấc ngủ tốt, bạn sẵn sàng cho ngày mới!\"",
  },
  {
    time: "7:30",
    period: "sáng",
    icon: <PersonSimpleRun size={28} weight="duotone" className="text-emerald-500" />,
    title: "Chạy bộ buổi sáng",
    description: "GPS bật tự động khi phát hiện vận động, theo dõi nhịp tim real-time, tính quãng đường và calo tiêu thụ.",
  },
  {
    time: "14:00",
    period: "chiều",
    icon: <BellRinging size={28} weight="duotone" className="text-sky-500" />,
    title: "Nhắc nhở thông minh",
    description: "Sau 1 tiếng ngồi liên tục, VitaWatch rung nhẹ nhắc bạn đứng dậy vận động. AI gợi ý: \"Đi bộ 5 phút giúp tăng năng suất buổi chiều.\"",
  },
  {
    time: "22:00",
    period: "tối",
    icon: <Moon size={28} weight="duotone" className="text-indigo-500" />,
    title: "Theo dõi giấc ngủ",
    description: "Chế độ ngủ tự động kích hoạt, theo dõi nhịp tim và SpO2 xuyên đêm, phân tích các giai đoạn ngủ để đánh giá vào sáng hôm sau.",
  },
];

export function ScrollytellingSection() {
  console.log("Rendering ScrollytellingSection with LIGHT theme bg-white");
  return (
    <section id="scrollytelling" className="relative w-full bg-white dark:bg-transparent transition-colors duration-300 border-t border-slate-100 dark:border-transparent">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto pt-24 pb-12 px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-heading font-bold tracking-tight mb-4 text-slate-900 dark:text-white"
        >
          Một ngày với VitaWatch AI
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-slate-600 dark:text-gray-400"
        >
          Từ lúc thức dậy đến khi chìm vào giấc ngủ, VitaWatch AI luôn đồng hành cùng bạn.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start relative">
          
          {/* Left: Sticky Watch */}
          <div className="sticky top-0 h-screen w-full lg:w-1/2 flex flex-col items-center justify-center -z-10 lg:z-0">
            {/* Aura Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500/10 dark:bg-teal-400/20 blur-[80px] w-64 h-64 rounded-full transition-colors duration-300" />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, margin: "-20%" }}
              transition={{ duration: 0.8 }}
              className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] lg:w-[450px] lg:h-[450px] mt-[-10vh] lg:mt-0"
            >
              <Image 
                src="/images/anhchinh.png" 
                alt="VitaWatch Features"
                fill
                sizes="(max-width: 1024px) 260px, 400px"
                className="object-contain drop-shadow-xl"
              />
            </motion.div>
          </div>

          {/* Right: Scrolling Text Blocks */}
          <div className="w-full lg:w-1/2 flex flex-col pb-[20vh] -mt-[100vh] pt-[60vh] lg:mt-0 lg:pt-[30vh]">
            {milestones.map((milestone, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-30% 0px -30% 0px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="min-h-[70vh] flex flex-col justify-center items-center lg:items-start max-w-md mx-auto lg:ml-auto lg:mr-0"
              >
                <div className="bg-slate-50/80 dark:bg-gray-800/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-200/50 dark:border-gray-700/50 shadow-xl lg:hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center shadow-inner">
                      {milestone.icon}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest">
                        {milestone.time} {milestone.period}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-heading font-bold mb-4 text-slate-900 dark:text-white">
                    {milestone.title}
                  </h3>
                  <p className="text-slate-600 dark:text-gray-400 leading-relaxed text-lg">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
