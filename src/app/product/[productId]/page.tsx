import Link from "next/link";
import { notFound } from "next/navigation";

// ইংরেজি সংখ্যাকে বাংলা সংখ্যায় কনভার্ট করার হেল্পার - এটি একটি ফাংশন
const toBn = (num: number | string | undefined | null) => {
  if (num === undefined || num === null || num === "") return "";
  return Number(num).toLocaleString("bn-BD");
};

// ইউনিট ইংরেজি থেকে বাংলায় রূপান্তর করার ম্যাপিং - এটি একটি লুকআপ ম্যাপ
const unitMap: Record<string, string> = {
  kg: "কেজি",
  liter: "লিটার",
  piece: "পিস",
  dozen: "ডজন",
};

interface IDetailsPageType {
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
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  change: {
    dir: string;
    pct: number;
  };
  markets: {
    market: string;
    division: string;
    min: number;
    max: number;
    avg?: number;
  }[];
}

const SingleProductPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;

  const res = await fetch(
    `${process.env.BACKEND_URL}/api/bazardor/products?slug=${productId}`,
  );

  if (!res.ok) return notFound();

  const data = await res.json();
  const product: IDetailsPageType = Array.isArray(data) ? data[0] : data;

  if (!product) return notFound();

  // ১. ইউনিট বাংলায় রূপান্তর
  const displayUnit = unitMap[product.unit] || product.unit;

  // ২. বাজারের তালিকা
  const productMarkets = product.markets;

  // ৩. বাজারগুলোর ডেটা থেকে ডাইনামিকভাবে সর্বনিম্ন, সর্বাধিক ও গড় দাম বের করা
  const allMins = productMarkets.map((m) => m.min).filter(Boolean);
  const allMaxs = productMarkets.map((m) => m.max).filter(Boolean);

  const minPrice =
    allMins.length > 0
      ? Math.min(...allMins)
      : product.minPrice || product.today;
  const maxPrice =
    allMaxs.length > 0
      ? Math.max(...allMaxs)
      : product.maxPrice || product.today;

  const avgPrice =
    productMarkets.length > 0
      ? Math.round(
          productMarkets.reduce(
            (acc: number, m) => acc + (m.min + m.max) / 2,
            0,
          ) / productMarkets.length,
        )
      : product.avgPrice || product.today;

  return (
    <main className="container mx-auto px-4 py-6 max-w-6xl space-y-6 text-gray-800">
      {/* ১. ব্রেডক্রাম্ব নেভিগেশন */}
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-800 transition">
          হোম
        </Link>
        <span>›</span>
        <span className="hover:text-gray-800 cursor-pointer">
          {product.categoryNameBn}
        </span>
        <span>›</span>
        <span className="text-gray-800 font-medium">{product.nameBn}</span>
      </nav>

      {/* ২. টপ ব্যানার / কার্ড */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-4xl shadow-inner shrink-0">
            {product.image || product.categoryIcon}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {product.nameBn}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              প্রতি {displayUnit} • {product.categoryNameBn}
            </p>
            {product.change && (
              <p className="text-xs text-gray-500 mt-2">
                গতকালের তুলনায় আজ দাম{" "}
                <span className="font-semibold">
                  {product.change.dir === "up" ? "বেড়েছে" : "কমেছে"}
                </span>{" "}
                {toBn(product.change.pct)}%
              </p>
            )}
          </div>
        </div>

        {/* ডানপাশের আজকের দামের বক্স */}
        <div className="bg-gray-50/80 px-6 py-4 rounded-xl border border-gray-100 text-center min-w-35 shrink-0 self-start md:self-auto">
          <span className="text-xs text-gray-500 block">আজকের দাম</span>
          <span className="text-3xl font-black text-gray-900 block my-0.5">
            {toBn(product.today)}
          </span>
          <span className="text-xs text-gray-500 block">
            টাকা / {displayUnit}
          </span>
          {product.change && (
            <span
              className={`inline-flex items-center gap-1 text-xs font-semibold mt-1 ${
                product.change.dir === "up"
                  ? "text-rose-600"
                  : "text-emerald-600"
              }`}
            >
              {product.change.dir === "up" ? "▲" : "▼"}{" "}
              {toBn(product.change.pct)}%
            </span>
          )}
        </div>
      </div>

      {/* ৩. দামের সারসংক্ষেপ (৩টি কার্ড) */}
      <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-gray-900">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* সর্বনিম্ন দাম */}
          <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
            <span className="text-xs text-gray-500">সর্বনিম্ন দাম</span>
            <div className="text-2xl font-bold text-emerald-600 my-1">
              {toBn(minPrice)} টাকা
            </div>
            <span className="text-xs text-gray-400">
              সবচেয়ে কম দামের বাজার
            </span>
          </div>

          {/* সর্বাধিক দাম */}
          <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
            <span className="text-xs text-gray-500">সর্বাধিক দাম</span>
            <div className="text-2xl font-bold text-rose-600 my-1">
              {toBn(maxPrice)} টাকা
            </div>
            <span className="text-xs text-gray-400">
              সবচেয়ে বেশি দামের বাজার
            </span>
          </div>

          {/* গড় দাম */}
          <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
            <span className="text-xs text-gray-500">গড় দাম</span>
            <div className="text-2xl font-bold text-emerald-700 my-1">
              {toBn(avgPrice)} টাকা
            </div>
            <span className="text-xs text-gray-400">
              প্রতি {displayUnit}-এর হিসাবে
            </span>
          </div>
        </div>
      </section>

      {/* ৪. বাজারভিত্তিক আজকের দাম (টেবিল) */}
      <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-gray-900">
          বাজারভিত্তিক আজকের দাম
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 text-xs font-medium">
                <th className="py-3 px-4">বাজার</th>
                <th className="py-3 px-4">বিভাগ</th>
                <th className="py-3 px-4 text-center">সর্বনিম্ন</th>
                <th className="py-3 px-4 text-center">সর্বাধিক</th>
                <th className="py-3 px-4 text-right">গড়</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {productMarkets.map((m, index: number) => {
                const avg = m.avg ?? Math.round((m.min + m.max) / 2);

                return (
                  <tr key={index} className="hover:bg-gray-50/70 transition">
                    <td className="py-3.5 px-4 font-semibold text-gray-800">
                      {m.market}
                    </td>
                    <td className="py-3.5 px-4 text-gray-500">{m.division}</td>
                    <td className="py-3.5 px-4 text-center text-gray-700">
                      {toBn(m.min)} টাকা
                    </td>
                    <td className="py-3.5 px-4 text-center text-gray-700">
                      {toBn(m.max)} টাকা
                    </td>
                    <td className="py-3.5 px-4 text-right font-medium text-gray-800">
                      {toBn(avg)} টাকা
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default SingleProductPage;
