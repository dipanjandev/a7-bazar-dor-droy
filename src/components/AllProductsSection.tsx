import ProductCard from "./ProductCard";
import SortDropdown from "./SortDropdown"; // তোমার তৈরি করা ড্রপডাউন কম্পোনেন্ট

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
  sort?: string; // URL searchParams থেকে আসা মান (default | low-to-high | high-to-low)
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
    <section className="space-y-4 container mx-auto mt-10">
      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 pb-1">
        <div>
          <h2 className="text-xl font-bold text-gray-900">সব পণ্য</h2>
          <p>
            মোট {sortedProducts.length.toLocaleString("bn-BD")}টি পণ্য দেখানো
            হচ্ছে
          </p>
        </div>

        {/* আলাদা তৈরি করা সর্ট ড্রপডাউন কম্পোনেন্ট */}
        <SortDropdown />
      </div>

      {/* সাজানো পণ্যের গ্রিড (সার্ভার থেকে পিওর HTML রেন্ডার হবে) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedProducts.map((item) => (
          <ProductCard key={item.id} singleProduct={item} />
        ))}
      </div>
    </section>
  );
}
