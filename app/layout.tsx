import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";
import { ClientTracker } from "@/components/ClientTracker";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "VitaWatch AI | Sức khỏe thông minh trên cổ tay bạn",
  description: "Khám phá VitaWatch AI - Đồng hồ thông minh thế hệ mới tích hợp trí tuệ nhân tạo, theo dõi nhịp tim, SpO2 và phân tích giấc ngủ 24/7.",
  keywords: ["VitaWatch", "Đồng hồ thông minh", "Smartwatch AI", "Theo dõi sức khỏe", "HeliCorp"],
  openGraph: {
    title: "VitaWatch AI | Sức khỏe thông minh trên cổ tay bạn",
    description: "Khám phá VitaWatch AI - Đồng hồ thông minh thế hệ mới tích hợp trí tuệ nhân tạo, theo dõi nhịp tim, SpO2 và phân tích giấc ngủ 24/7.",
    url: "https://vitawatch.helicorp.vn",
    siteName: "VitaWatch AI",
    images: [
      {
        url: "/images/hero-watch-transparent.png", // Fallback to hero image for OG
        width: 1200,
        height: 630,
        alt: "VitaWatch AI Smartwatch",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VitaWatch AI | Sức khỏe thông minh",
    description: "Đồng hồ thông minh thế hệ mới tích hợp trí tuệ nhân tạo.",
    images: ["/images/hero-watch-transparent.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning className="scroll-smooth">
      <body className={`${nunito.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="bottom-right" />
          <ClientTracker />
        </ThemeProvider>
      </body>
    </html>
  );
}
