"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";

interface ICardDataType {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: string;
    pct: number;
  };
}

export default function AllProductsSection({ aps }: { aps: ICardDataType[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [sortBy, setSortBy] = useState("default");

  // ড্রপডাউনের জন্য অপশন তালিকা। এখানে as const লিখে আমি ডাটা গুলো রিড অনলি করে দিলাম। এক কথায় এখন ফিক্সড।
  const sortOptions = [
    { label: "ডিফল্ট", value: "default" },
    { label: "দাম: কম থেকে বেশি", value: "low-to-high" },
    { label: "দাম: বেশি থেকে কম", value: "high-to-low" },
  ] as const;

  // সর্টিং লজিক
  const sortedProducts = [...aps].sort((a, b) => {
    if (sortBy === "low-to-high") {
      return a.today - b.today; // দাম কম থেকে বেশি
    }
    if (sortBy === "high-to-low") {
      return b.today - a.today; // দাম বেশি থেকে কম
    }
    return 0; // ডিফল্ট যেভাবে আছে
  });

  // বর্তমান অপশনের নাম
  const currentLabel = sortOptions.find((opt) => opt.value === sortBy)?.label;

  return (
    <section className="space-y-4 container mx-auto mt-10">
      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 pb-1">
        <div>
          <h2 className="text-xl font-bold text-gray-900">সব পণ্য</h2>
          <p>
            মোট {sortedProducts.length.toLocaleString("bn-BD")}টি পণ্য দেখানো
            হচ্ছে
          </p>
        </div>

        {/* ড্রপডাউন কন্টেইনার */}
        <div className="flex items-center gap-2">
          <span>সাজান</span>

          <div className="relative">
            {/* সাজান বাটন */}
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition"
            >
              <span>{currentLabel}</span>
              <span className="text-[10px] text-gray-500">
                {isOpen ? "▲" : "▼"}
              </span>
            </button>

            {/* মেনু লিস্ট (ছবিতে যেমন ভাসমান মেনু দেখাচ্ছে) */}
            {isOpen && (
              <>
                {/* বাইরে ক্লিক করলে বন্ধ হওয়ার জন্য অদৃশ্য ব্যাকড্রপ */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsOpen(false)}
                />

                <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-20 space-y-0.5">
                  {sortOptions.map((opt) => {
                    const isSelected = sortBy === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setSortBy(opt.value);
                          setIsOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 hover:bg-gray-50 transition ${
                          isSelected
                            ? "font-semibold text-gray-900"
                            : "text-gray-600"
                        }`}
                      >
                        <span className="w-3 text-xs">
                          {isSelected ? "✓" : ""}
                        </span>
                        <span>{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* সাজানো পণ্যের গ্রিড */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedProducts.map((item) => (
          <ProductCard key={item.id} singleProduct={item} />
        ))}
      </div>
    </section>
  );
}
