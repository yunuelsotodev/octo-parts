import { ModalAdd } from "@/components/features/modalAdd";
import { Button } from "@/components/ui/button";
import BodyFormProduct from "./_components/BodyFormProduct";
import CartProducts from "./_components/CartProducts";
import { getYears } from "@/utils/years";
import { getModels } from "@/data/products/get-models";
import { getBrands } from "@/data/products/get-brands";
import { getProducts } from "@/data/products/get-products";

export default async function Products() {
  const years = getYears();
  const models = await getModels();
  const brands = await getBrands();
  const products = await getProducts();

  return (
    <main className="flex flex-1 min-h-0 flex-col">
      <section className="my-2 mr-2 flex shrink-0 flex-row justify-end">
        <ModalAdd
          button={<Button>+ Pieza nueva</Button>}
          formBody={<BodyFormProduct brands={brands} models={models} years={years} />}
          title="Agregar producto"
        />
      </section>
      <section className="overflow-y-scroll flex-1 min-h-0 pt-2 px-2">
          <CartProducts products={products}/>
      </section>
    </main>
  )
}
