import ProductCard from "./ProductCard";
import SortDropdown from "./SortDropdown";

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

interface AllProductsSectionProps {
  aps: ICardDataType[];
  sort?: string;
}

export default function AllProductsSection({
  aps,
  sort = "default",
}: AllProductsSectionProps) {
  // সার্ভার সাইডেই সর্টিং হচ্ছে (SEO-র কোনো ক্ষতি হবে না)
  const sortedProducts = [...aps].sort((a, b) => {
    if (sort === "low-to-high") {
      return a.today - b.today; // দাম কম থেকে বেশি
    }
    if (sort === "high-to-low") {
      return b.today - a.today; // দাম বেশি থেকে কম
    }
    return 0; // ডিফল্ট
  });

  return (
    <section className="space-y-4 container mx-auto px-4 sm:px-6 lg:px-0 mt-8 sm:mt-10 mb-8 sm:mb-10">
      {/* হেডার ও সাজান ড্রপডাউন: মোবাইলে টেক্সট ও ড্রপডাউন যাতে ভেঙে নিচে না পড়ে সেজন্য items-end বা flex-row সুন্দর বিন্যাস */}
      <div className="flex flex-row items-end justify-between text-xs sm:text-sm text-gray-500 pb-1 gap-2">
        <div className="space-y-0.5">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
            সব পণ্য
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            মোট {sortedProducts.length.toLocaleString("bn-BD")}টি পণ্য দেখানো
            হচ্ছে
          </p>
        </div>

        {/* সর্ট ড্রপডাউন (মোবাইলে মাপসই রাখার জন্য shrink-0) */}
        <div className="shrink-0">
          <SortDropdown />
        </div>
      </div>

      {/* সাজানো পণ্যের গ্রিড: মোবাইল: ১ কলাম, ট্যাবলেট: ২ কলাম, ডেস্কটপ: ৩ কলাম */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {sortedProducts.map((item) => (
          <ProductCard key={item.id} singleProduct={item} />
        ))}
      </div>
    </section>
  );
}
