import { getYears } from "@/utils/years";
import { getModels } from "@/data/products/get-models";
import { getBrands } from "@/data/products/get-brands";
import { getProducts } from "@/data/products/get-products";
import BodyProductHome from "./_components/BodyProductHome";

export default async function Products() {
  const years = getYears();
  const models = await getModels();
  const brands = await getBrands();
  const products = await getProducts();

  return (
    <main className="flex flex-1 min-h-0 flex-col">
      <BodyProductHome models={models} brands={brands} years={years} products={products} />
    </main>
  )
}
