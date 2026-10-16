import { ModalAdd } from "@/components/features/modalAdd";
import { Button } from "@/components/ui/button";
import FormProduct from "./_components/FormProduct";
import CartProducts from "./_components/CartProducts";

export default function Products() {
  
  return (
    <main>
      <section className="my-2 mr-2 flex flex-row justify-end">
        <ModalAdd
          button={<Button>+ Pieza nueva</Button>}
          formBody={<FormProduct/>}
          title="Agregar producto"
        />        
      </section>
      <section className="overflow-y-scroll h-full">
          <CartProducts/>
      </section>
    </main>
  )
}
