import Link from "next/link";
import React from "react";

interface IdataType {
  slug: string;
  nameBn: string;
  icon: string;
}

const CategoryList = async () => {
  const res = await fetch(`${process.env.BACKEND_URL}/api/bazardor/categories`);
  const categories: IdataType[] = await res.json();

  return (
    <div className="flex items-center gap-1.5 sm:gap-4 overflow-x-auto no-scrollbar py-1">
      {categories.map((ctg, ind) => (
        <Link key={ind} href={`/category/${ctg.slug}`} className="shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl hover:bg-gray-100 transition-colors duration-150 cursor-pointer">
            <span className="text-sm sm:text-base leading-none">
              {ctg.icon}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">
              {ctg.nameBn}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;
