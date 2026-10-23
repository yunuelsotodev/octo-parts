import { ProductScrapp } from "@/interfaces/product-scrapp";
import { Result } from "./mercadolibre.types";
import { ProductDetail } from "./mercadolibre.detail.types";

export function mapperResultToProductScrapp(results: Result[], productsDetails : ProductDetail[]) : ProductScrapp[]
{
    // TODO: TERMINAR IMPLEMENTACION AUNQUE NO LA APLIQUE
    const productDetail : ProductScrapp[] = [];

    for (const pd of productsDetails) {
        console.log(pd)
    }

    return productDetail;
}