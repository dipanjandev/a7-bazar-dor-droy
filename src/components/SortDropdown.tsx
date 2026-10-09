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
    <div className="flex items-center gap-2">
      <span className="text-gray-600 text-xs sm:text-sm">সাজান</span>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition cursor-pointer"
        >
          <span>{currentLabel}</span>
          <span className="text-[10px] text-gray-500">
            {isOpen ? "▲" : "▼"}
          </span>
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-20 space-y-0.5">
              {sortOptions.map((opt) => {
                const isSelected = currentSort === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSortChange(opt.value)}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 hover:bg-gray-50 transition cursor-pointer ${
                      isSelected
                        ? "font-semibold text-gray-900"
                        : "text-gray-600"
                    }`}
                  >
                    <span className="w-3 text-xs">{isSelected ? "✓" : ""}</span>
                    <span>{opt.label}</span>
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
