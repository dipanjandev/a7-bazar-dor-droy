import ProductCard from "@/components/ProductCard";
import SortDropdown from "@/components/SortDropdown";

interface PageProps {
  params: Promise<{ categorySlug: string }>;
  searchParams: Promise<{ sort?: string }>;
}

const CategoryProducts = async ({ params, searchParams }: PageProps) => {
  const { categorySlug } = await params;
  const { sort } = await searchParams;

  const res = await fetch(
    `${process.env.BACKEND_URL}/api/bazardor/products?category=${categorySlug}`,
  );
  const products = await res.json();

  // সার্ভার সাইডেই সর্টিং হচ্ছে (SEO সেফ)
  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "low-to-high") return a.today - b.today;
    if (sort === "high-to-low") return b.today - a.today;
    return 0;
  });

  const categoryTitle = products[0]?.categoryNameBn;
  const categoryIcon = products[0]?.categoryIcon;
  const totalCountBn = sortedProducts.length.toLocaleString("bn-BD");

  return (
    <div className="container mx-auto px-4 py-6 space-y-5">
      {/* ব্যানার */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-3xl shadow-inner">
          {categoryIcon}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">
            {categoryTitle}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            {totalCountBn}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      {/* সাব-হেডার ও ড্রপডাউন */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 py-1">
        <p className="font-normal text-gray-600">
          মোট {totalCountBn}টি পণ্য দেখানো হচ্ছে
        </p>

        {/* রিইউজেবল ড্রপডাউন */}
        <SortDropdown />
      </div>

      {/* প্রোডাক্ট গ্রিড (সার্ভারেই রেন্ডার হচ্ছে) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedProducts.map((singleProduct) => (
          <div key={singleProduct.id}>
            <ProductCard singleProduct={singleProduct} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
