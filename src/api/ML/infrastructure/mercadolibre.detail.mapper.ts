import { ProductScrapp } from "@/interfaces/product-scrapp";
import { ProductDetail } from "./mercadolibre.detail.types";


export function mapperProductScrapp(product: ProductDetail) : ProductScrapp
{    
    return {
        title: product.title,
        price: `${product.price}`,
        image: product.pictures?.[0]?.url?.replace('http://', 'https://') || null,
        url: ''
    };
}