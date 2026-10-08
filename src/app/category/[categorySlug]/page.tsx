import ProductCard from "@/components/ProductCard";

interface IparamsType {
  params: Promise<{ categorySlug: string }>;
}

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

const CategoryProducts = async ({ params }: IparamsType) => {
  const { categorySlug } = await params;

  const res = await fetch(
    `${process.env.BACKEND_URL}/api/bazardor/products?category=${categorySlug}`,
  );
  const products: ICardDataType[] = await res.json();

  // ব্যানারের জন্য প্রথম প্রোডাক্ট থেকে ক্যাটাগরির তথ্য নেওয়া
  const categoryTitle = products[0]?.categoryNameBn;
  const categoryIcon = products[0]?.categoryIcon;
  const totalCountBn = products.length.toLocaleString("bn-BD");

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* ১. শীর্ষ হেডার ব্যানার */}
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

      {/* ২. সাব-হেডার (মোট কাউন্ট ও ড্রপডাউন) */}
      <div className="flex items-center justify-between text-sm text-gray-600 px-1">
        <p className="font-medium">মোট {totalCountBn}টি পণ্য দেখানো হচ্ছে</p>
      </div>

      {/* ৩. প্রোডাক্ট কার্ড গ্রিড */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((singleProduct) => {
          return (
            <div key={singleProduct.id}>
              <ProductCard singleProduct={singleProduct} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryProducts;
