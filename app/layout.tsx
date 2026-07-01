import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "vietnamese"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "VitaWatch AI — Đồng hồ thông minh theo dõi sức khỏe",
  description: "Theo dõi nhịp tim, SpO2, giấc ngủ 24/7. AI cá nhân hoá gợi ý mỗi ngày. Đặt trước VitaWatch AI ngay hôm nay.",
  openGraph: {
    title: "VitaWatch AI — Sức khỏe thông minh, ngay trên cổ tay bạn",
    description: "Đồng hồ thông minh theo dõi sức khỏe toàn diện, tích hợp AI gợi ý cá nhân hoá.",
    images: ["/og-image.jpg"],
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans min-h-screen bg-white dark:bg-gray-900 text-slate-900 dark:text-gray-100 antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
