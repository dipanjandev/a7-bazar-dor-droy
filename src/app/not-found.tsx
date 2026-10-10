import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F4F6F4] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-10 text-center space-y-6">
        {/* সেন্ট্রাল মডার্ন আইকন ও অ্যানিমেশন */}
        <div className="relative flex items-center justify-center mx-auto">
          {/* সফট গ্রিন গ্লো */}
          <div className="absolute size-24 sm:size-28 rounded-full bg-emerald-500/10 animate-ping duration-1000" />

          {/* বড় ব্যাজ ও ফাঁকা ব্যাগের আইকন */}
          <div className="relative size-20 sm:size-24 rounded-3xl bg-emerald-50 border border-emerald-100 text-[#05893E] flex flex-col items-center justify-center shadow-sm">
            <span className="text-3xl sm:text-4xl">🛍️</span>
          </div>
        </div>

        {/* ৪০৪ বড় টেক্সট ও বিবরণ */}
        <div className="space-y-2">
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-100/60 text-[#05893E] text-xs font-bold tracking-wider">
            ৪০৪ • পৃষ্ঠা পাওয়া যায়নি
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
            পৃষ্ঠাটি খুঁজে পাওয়া যায়নি!
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
            আপনি যে ঠিকানায় যেতে চাইছেন তা হয়তো মুছে ফেলা হয়েছে, নাম পরিবর্তন
            করা হয়েছে অথবা লিঙ্কটিতে ভুল রয়েছে।
          </p>
        </div>

        {/* অ্যাকশন বাটনসমূহ: মোবাইলে নিচে নিচে, বড় পর্দায় পাশাপাশি */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {/* হোমপেজে ফেরার বাটন */}
          <Link
            href="/"
            className="w-full sm:w-auto flex-1 bg-[#05893E] hover:bg-[#046e32] active:scale-95 text-white font-medium py-2.5 sm:py-3 px-5 rounded-xl transition-all duration-200 text-xs sm:text-sm shadow-sm flex items-center justify-center gap-2"
          >
            <span>🏠</span>
            <span>হোম পেজে ফিরে যান</span>
          </Link>

          {/* সব পণ্য সেকশনের বাটন */}
          <Link
            href="/#all-products"
            className="w-full sm:w-auto flex-1 bg-gray-100 hover:bg-gray-200 active:scale-95 text-gray-700 font-medium py-2.5 sm:py-3 px-5 rounded-xl transition-all duration-200 text-xs sm:text-sm text-center flex items-center justify-center gap-2"
          >
            <span>📦</span>
            <span>সব পণ্য দেখুন</span>
          </Link>
        </div>

        {/* সাহায্য বা ফুটার নোট */}
        <div className="pt-2 border-t border-gray-100">
          <p className="text-[11px] text-gray-400">
            বাজারের সঠিক দাম ও তালিকা দেখতে আমাদের হোম পেজে ভিজিট করুন।
          </p>
        </div>
      </div>
    </div>
  );
}
