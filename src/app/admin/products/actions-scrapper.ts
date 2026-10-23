'use server'

import { ProductScrapp } from "@/interfaces/product-scrapp";
import { navigation } from "../../../../scripts/scrape"

interface Props {
    name: string,
    model: string | null,
    brand: string | null,
    year: number | null
}

export const getScrapedProductsAction = async (name : string, model : string|null = '', brand : string|null = '', year : number|null) : Promise<ProductScrapp[]> => {
    const product = await navigation(name, model, brand, year);
    return product;
}