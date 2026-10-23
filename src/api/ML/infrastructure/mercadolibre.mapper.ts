import { ProductScrapp } from "@/interfaces/product-scrapp";
import { Result } from "./mercadolibre.types";
import { getProductByID } from "../repositories/product.repository";

export async function mapperResultToProductScrapp(results: Result[])
{
    // TODO: TERMINAR IMPLEMENTACION AUNQUE NO LA APLIQUE
    for (const result of results) {
        const productDetail = await getProductByID(result.id);
        console.log(productDetail);
    }
}