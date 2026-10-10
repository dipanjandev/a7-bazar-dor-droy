"use client";

import Link from "next/link";
import React, { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // প্রয়োজন হলে এররটি কনসোলে বা কোনো লগিং সার্ভিসে পাঠাতে পারো
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F4F6F4] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-10 text-center space-y-6">
        {/* সেন্ট্রাল মডার্ন এরর আইকন ও গ্লো */}
        <div className="relative flex items-center justify-center mx-auto">
          {/* পালসিং সফট রেড গ্লো */}
          <div className="absolute size-20 sm:size-24 rounded-full bg-rose-500/10 animate-ping duration-1000" />

          {/* মাঝের আইকন ব্যাজ */}
          <div className="relative size-16 sm:size-20 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center text-3xl sm:text-4xl shadow-sm">
            ⚠️
          </div>
        </div>

        {/* টেক্সট ও এরর মেসেজ */}
        <div className="space-y-2">
          <span className="text-[11px] sm:text-xs font-bold tracking-wider text-rose-600 uppercase bg-rose-50 px-3 py-1 rounded-full inline-block">
            কিছু একটা সমস্যা হয়েছে
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight leading-tight">
            বাজারের তথ্য লোড করা যায়নি
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
            সার্ভারের সাথে সংযোগে সাময়িক সমস্যা দেখা দিয়েছে। অনুগ্রহ করে
            পুনরায় চেষ্টা করুন অথবা হোম পেজে ফিরে যান।
          </p>
        </div>

        {/* ডেভেলপার এরর ডিটেইলস (প্রয়োজন হলে দেখতে পারার জন্য হালকা কার্ড) */}
        {error?.message && (
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-left overflow-hidden">
            <p className="text-[11px] font-mono text-gray-500 truncate">
              <span className="font-semibold text-gray-700">ত্রুটি:</span>{" "}
              {error.message}
            </p>
          </div>
        )}

        {/* অ্যাকশন বাটনসমূহ: মোবাইলে ওপর-নিচ, ট্যাবলেটে/পিসিতে পাশাপাশি */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {/* পেজ রিলোড না করে রি-ট্রাই করার বাটন */}
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto flex-1 bg-[#05893E] hover:bg-[#046e32] active:scale-95 text-white font-medium py-2.5 sm:py-3 px-5 rounded-xl transition-all duration-200 text-xs sm:text-sm shadow-sm cursor-pointer flex items-center justify-center gap-2"
          >
            <span>🔄</span>
            <span>আবার চেষ্টা করুন</span>
          </button>

          {/* হোমপেজে ফেরার বাটন */}
          <Link
            href="/"
            className="w-full sm:w-auto flex-1 bg-gray-100 hover:bg-gray-200 active:scale-95 text-gray-700 font-medium py-2.5 sm:py-3 px-5 rounded-xl transition-all duration-200 text-xs sm:text-sm text-center"
          >
            হোম পেজে যান
          </Link>
        </div>

        {/* ফুটার সাপোর্ট বা হেল্প মেসেজ */}
        <div className="pt-2 border-t border-gray-100">
          <p className="text-[11px] text-gray-400">
            সমস্যাটি বারবার হলে অনুগ্রহ করে কিছুক্ষণ পর চেষ্টা করুন।
          </p>
        </div>
      </div>
    </div>
  );
}
