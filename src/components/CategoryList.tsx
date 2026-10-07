import Link from "next/link";
import React from "react";

interface IdataType {
  slug: string;
  nameBn: string;
  icon: string;
}

const CategoryList = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
  );
  const categories: IdataType[] = await res.json();
  //   console.log(categories, "from catagories categories");
  return (
    <div className="flex gap-5">
      {categories.map((ctg, ind) => (
        <Link key={ind} href={`${ctg.slug}`}>
          <div className="flex hover:bg-gray-100 rounded-2xl p-2 my-3">
            <p>{ctg.icon}</p>
            <p className="font-semibold">{ctg.nameBn}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;
