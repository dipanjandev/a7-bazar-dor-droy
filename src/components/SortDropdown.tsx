"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const sortOptions = [
  { label: "ডিফল্ট", value: "default" },
  { label: "দাম: কম থেকে বেশি", value: "low-to-high" },
  { label: "দাম: বেশি থেকে কম", value: "high-to-low" },
] as const;

export default function SortDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") || "default";
  const currentLabel =
    sortOptions.find((opt) => opt.value === currentSort)?.label || "ডিফল্ট";

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "default") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    // URL আপডেট করা (পেজ ফুল রিলোড হবে না, শুধু সার্ভার কম্পোনেন্ট রি-রেন্ডার হবে)
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    setIsOpen(false);
  };

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <span className="text-gray-600 text-xs sm:text-sm whitespace-nowrap">
        সাজান
      </span>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-1.5 sm:gap-2 bg-white border border-gray-200 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 active:bg-gray-100 transition cursor-pointer select-none"
        >
          <span className="truncate max-w-27.5 sm:max-w-none">
            {currentLabel}
          </span>
          <span className="text-[9px] sm:text-[10px] text-gray-500 shrink-0">
            {isOpen ? "▲" : "▼"}
          </span>
        </button>

        {isOpen && (
          <>
            {/* বাইরে ক্লিক করলে বন্ধ হওয়ার জন্য ব্যাকড্রপ */}
            <div
              className="fixed inset-0 z-30"
              onClick={() => setIsOpen(false)}
            />

            {/* ড্রপডাউন অপশন তালিকা */}
            <div className="absolute right-0 mt-1.5 w-44 sm:w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-40 space-y-0.5 animate-in fade-in duration-100">
              {sortOptions.map((opt) => {
                const isSelected = currentSort === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSortChange(opt.value)}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-gray-50 active:bg-gray-100 transition cursor-pointer ${
                      isSelected
                        ? "font-semibold text-gray-900 bg-gray-50/70"
                        : "text-gray-600"
                    }`}
                  >
                    <span className="w-3 text-xs text-emerald-600 shrink-0">
                      {isSelected ? "✓" : ""}
                    </span>
                    <span className="truncate">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
