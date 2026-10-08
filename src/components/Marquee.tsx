import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface IMarqueeType {
  id: number;
  nameBn: string;
  categoryIcon: string;
  unit: string;
  today: number;
  change: {
    dir: string;
    pct: number;
  };
}

const Marquee = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
  );
  const data: IMarqueeType[] = await res.json();
  const toBengaliNumber = (num: number) => {
    return num.toLocaleString("bn-BD");
  };

  const formatUnit = (unit: string) => {
    if (unit === "kg") return "কেজি";
    if (unit === "litre") return "লিটার";
  };

  //   console.log(data);

  return (
    <div>
      <MarqueeText direction="right" duration={20}>
        {data.map((mq) => {
          const isUp = mq.change?.dir === "up";
          return (
            <div key={mq.id} className="border-l border-gray-300">
              <div className="mb-3 mx-3">
                <span className="flex border-gray-200 gap-2">
                  {/* icon */}
                  <span>
                    <span className="font-semibold text-lg">
                      {mq.categoryIcon} {mq.nameBn}
                    </span>{" "}
                    <span className="text-sm text-gray-600">
                      {toBengaliNumber(mq.today)} {formatUnit(mq.unit)} টাকা/
                    </span>
                  </span>

                  {/* Arrow Sign for indicate */}
                  <span
                    className={`flex items-center gap-0.5 text-xs font-semibold ${isUp ? "text-red-500" : "text-emerald-600"}`}
                  >
                    <span>
                      {isUp ? "▲" : "▼"} {toBengaliNumber(mq.change.pct)}%
                    </span>
                  </span>
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
