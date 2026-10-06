import FormProduct from "@/components/product/formProduct";
import { ModalAdd } from "@/components/product/modalAdd";
import { Button } from "@/components/ui/button";

export default function Products() {
  
  return (
    <main>
      <section className="my-2 mr-2 flex flex-row justify-end">
        <ModalAdd
          button={<Button>+ Pieza nueva</Button>}
          formBody={<FormProduct/>}
          subTitle="Agrega un nuevo producto"
          title="Agregar producto"
        />        
      </section>
      <section className="overflow-y-scroll h-full">
          
      </section>
    </main>
  )
}
