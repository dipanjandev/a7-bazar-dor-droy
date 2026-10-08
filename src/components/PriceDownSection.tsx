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

const PriceDownSection = ({ pds }: { pds: ICardDataType[] }) => {
  const PriceUpProducts = pds
    .filter((item) => item.change.dir === "down")
    .slice(0, 6);
  //   console.log(PriceUpProducts);

  return (
    <section className="container mx-auto mt-10">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl text-emerald-600">▼</span>
        <h2 className="text-2xl font-bold text-gray-900">আজ দাম কমেছে</h2>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {PriceUpProducts.map((newItem) => (
          <ProductCard key={newItem.id} singleProduct={newItem} />
        ))}
      </div>
    </section>
  );
};

export default PriceDownSection;
