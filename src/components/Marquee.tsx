import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface IMarqueeType {
  id: number;
  nameBn: string;
  image: string;
  unit: string;
  today: number;
  change: {
    dir: string;
    pct: number;
  };
}

const Marquee = async () => {
  const res = await fetch(`${process.env.BACKEND_URL}/api/bazardor/products`);
  const data: IMarqueeType[] = await res.json();
  const toBengaliNumber = (num: number) => {
    return num.toLocaleString("bn-BD");
  };

  const formatUnit = (unit: string) => {
    if (unit === "kg") return "কেজি";
    if (unit === "litre") return "লিটার";
    return unit;
  };

  return (
    <div className="w-full bg-[#FAFBF9] border-y border-gray-100/80 py-1.5 overflow-hidden">
      <MarqueeText direction="right" duration={25}>
        {data.map((mq) => {
          const isUp = mq.change?.dir === "up";
          return (
            <div
              key={mq.id}
              className="inline-flex items-center border-r border-gray-200/70 px-3 sm:px-4 text-xs sm:text-sm whitespace-nowrap select-none"
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* আইকন ও পণ্যের নাম */}
                <span className="flex items-center gap-1 font-medium text-gray-800">
                  <span className="text-sm sm:text-base leading-none">
                    {mq.image}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold">
                    {mq.nameBn}
                  </span>
                </span>

                {/* দাম এবং ইউনিট */}
                <span className="text-gray-600 text-[11px] sm:text-xs">
                  {toBengaliNumber(mq.today)} টাকা/{formatUnit(mq.unit)}
                </span>

                {/* পরিবর্তনের তীর চিহ্ন ও শতাংশ */}
                <span
                  className={`inline-flex items-center font-bold text-[10px] sm:text-xs pl-0.5 ${
                    isUp ? "text-red-500" : "text-emerald-600"
                  }`}
                >
                  <span className="scale-75 sm:scale-90 mr-0.5">
                    {isUp ? "▲" : "▼"}
                  </span>
                  <span>{toBengaliNumber(mq.change?.pct ?? 0)}%</span>
                </span>
              </div>
            </div>
          );
        })}
      </MarqueeText>
    </div>
  );
};

export default Marquee;
