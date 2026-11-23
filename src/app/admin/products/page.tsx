import { getYears } from "@/utils/years";
import { getModels } from "@/data/products/get-models";
import { getBrands } from "@/data/products/get-brands";
import { getProducts } from "@/data/products/get-products";
import { parseProductFilters } from "@/utils/product-filters";
import BodyProductHome from "./_components/BodyProductHome";

export default async function Products({ searchParams }: PageProps<'/admin/products'>) {
  const filters = parseProductFilters(await searchParams);
  const years = getYears();

  const [models, brands, products] = await Promise.all([
    getModels(),
    getBrands(),
    getProducts(filters),
  ]);

  return (
    <main className="flex flex-1 min-h-0 flex-col">
      <BodyProductHome models={models} brands={brands} years={years} products={products} filters={filters} />
    </main>
  )
}
