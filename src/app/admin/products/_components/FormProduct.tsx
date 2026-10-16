import { getYears } from "@/utils/years"
import { Image, Product } from "../../../../../generated/prisma/client";
import { getModels } from "@/data/products/get-models";
import { getBrands } from "@/data/products/get-brands";
import BodyFormProduct from "./BodyFormProduct";

interface Props {
    product?: Product & {
        images: Image[]
    },
}

export default async function FormProduct({ product }: Props) {
    const years = getYears();
    const models = await getModels();
    const brands = await getBrands();

    return (
        <BodyFormProduct
            brands={brands}
            models={models}
            years={years}
            {... product ? product=product : {}}
        />
    )
}
