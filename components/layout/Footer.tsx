import Link from "next/link";
import { FacebookLogo, InstagramLogo, YoutubeLogo } from "@phosphor-icons/react/dist/ssr";
import { TAGLINE } from "@/lib/constants";

export function Footer() {
  const navLinks = [
    { name: "Tính năng", href: "#features" },
    { name: "Thông số", href: "#specs" },
    { name: "Đặt trước", href: "#order" },
    { name: "Liên hệ", href: "#contact" },
  ];

  return (
    <footer className="bg-midnight text-white py-12 md:py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="flex flex-col gap-4">
          <Link href="/" className="font-heading font-bold text-2xl tracking-tight">
            VitaWatch
          </Link>
          <p className="text-gray-400 text-sm max-w-xs">{TAGLINE}</p>
        </div>

        <nav className="flex flex-wrap gap-6 md:gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="#" className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors" aria-label="Facebook">
            <FacebookLogo size={20} weight="fill" />
          </Link>
          <Link href="#" className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors" aria-label="Instagram">
            <InstagramLogo size={20} weight="fill" />
          </Link>
          <Link href="#" className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors" aria-label="YouTube">
            <YoutubeLogo size={20} weight="fill" />
          </Link>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <p>© 2026 VitaWatch AI — Made for Healthy Living Corporation.</p>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-gray-300">Điều khoản</Link>
          <Link href="#" className="hover:text-gray-300">Bảo mật</Link>
        </div>
      </div>
    </footer>
  );
}
