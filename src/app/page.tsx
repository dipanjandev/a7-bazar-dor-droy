import AllProductsSection from "@/components/AllProductsSection";
import HeroBaner from "@/components/HeroBaner";
import PriceDownSection from "@/components/PriceDownSection";
import PriceUpSection from "@/components/PriceUpSection";

interface HomePageProps {
  searchParams: Promise<{ sort?: string }>;
}
export default async function Home({ searchParams }: HomePageProps) {
  const { sort } = await searchParams;
  const res = await fetch(`${process.env.BACKEND_URL}/api/bazardor/products`);
  const allProducts = await res.json();
  return (
    <div>
      <HeroBaner />
      <PriceUpSection pus={allProducts} />
      <PriceDownSection pds={allProducts} />
      <AllProductsSection aps={allProducts} sort={sort} />
    </div>
  );
}
