const formatUnit = (unit: string) => {
  switch (unit?.toLowerCase()) {
    case "kg":
      return "কেজি";
    case "litre":
      return "লিটার";
    case "dozen":
      return "ডজন";
    case "piece":
      return "পিস";
    case "hali":
      return "হালি";
    default:
      return unit;
  }
};

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

export default function ProductCard({
  singleProduct,
}: {
  singleProduct: ICardDataType;
}) {
  const isUp = singleProduct.change?.dir === "up";
  const isDown = singleProduct.change?.dir === "down";
  const changePctBn = Math.abs(singleProduct.change?.pct || 0).toLocaleString(
    "bn-BD",
  );

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100/90 shadow-sm flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-lg cursor-pointer">
      {/* উপরের অংশ: আইকন, নাম ও পরিমাণ */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-2xl shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]">
          {singleProduct.image || singleProduct.categoryIcon}
        </div>
        <div>
          <h3 className="text-base font-bold text-gray-900 leading-tight">
            {singleProduct.nameBn}
          </h3>
          <p className="text-xs text-gray-500 font-normal mt-0.5">
            প্রতি {formatUnit(singleProduct.unit)}
          </p>
        </div>
      </div>

      {/* নিচের অংশ: আজকের দাম ও শতকরা পরিবর্তন */}
      <div className="flex items-end justify-between mt-6">
        <div>
          <span className="text-xs text-gray-500 font-medium block">
            আজকের দাম
          </span>
          <span className="text-xl font-extrabold text-gray-900 leading-tight">
            {singleProduct.today?.toLocaleString("bn-BD")} টাকা
          </span>
        </div>

        {/* পরিবর্তনের ব্যাজ */}
        <div
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
            isUp
              ? "bg-rose-50 text-rose-600"
              : isDown
                ? "bg-emerald-50 text-emerald-600"
                : "bg-gray-100 text-gray-600"
          }`}
        >
          <span className="text-[10px]">{isUp ? "▲" : isDown ? "▼" : "—"}</span>
          <span>{changePctBn}%</span>
        </div>
      </div>
    </div>
  );
}
