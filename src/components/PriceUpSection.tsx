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

const PriceUpSection = ({ pus }: { pus: ICardDataType[] }) => {
  const PriceUpProducts = pus
    .filter((item) => item.change.dir === "up")
    .slice(0, 6);

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-0 mt-8 sm:mt-10">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <span className="text-xl sm:text-2xl text-rose-600">▲</span>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
          আজ দাম বেড়েছে
        </h2>
      </div>

      {/* মোবাইল: ১ কলাম, ট্যাবলেট: ২ কলাম, ডেস্কটপ: ৩ কলাম */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
        {PriceUpProducts.map((newItem) => (
          <ProductCard key={newItem.id} singleProduct={newItem} />
        ))}
      </div>
    </section>
  );
};

export default PriceUpSection;
