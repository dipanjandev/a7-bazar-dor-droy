import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import FooterSection from "@/components/FooterSection";
import { Toaster } from "react-hot-toast";

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["latin", "bengali"],
});

export const metadata: Metadata = {
  title: "বাজার দর — আজকের বাজারের দাম এক নজরে",
  description: "চাল, ডাল, তেল, সবজি সহ নিত্যপ্রয়োজনীয় পণ্যের বাজার দর।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${notoSansBengali.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NavBar />
        <div className="bg-[#F0F5F0] flex-1">{children}</div>
        <FooterSection />
        <Toaster />
      </body>
    </html>
  );
}
