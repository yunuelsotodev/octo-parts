import { searchMercadoLibreAPI } from "@/api/ML/repositories/product.repository";
import { ProductScrapp } from "@/interfaces/product-scrapp";
import { getTerms } from "@/utils/search-terms";
import { chromium } from "@playwright/test";

export const navigation = async (name: string, model: string | null = '', brand: string | null = '', year: number | null): Promise<ProductScrapp[]> => {
    const terms = getTerms(name, model, brand, year);

    const amazonProducts = await searchAmazon(terms);
    const mLProducts = await searchMercadoLibreAPI(terms);

    const products: ProductScrapp[] = [
        ...amazonProducts,
        ...mLProducts
    ];

    return products;
}

async function searchAmazon(terms: (string | undefined)[]): Promise<ProductScrapp[]> {
    const browser = await chromium.launch({ headless: true });

    const page = await browser.newPage();

    const URL = 'https://www.amazon.com.mx/s?k=' + terms.join('+');

    await page.goto(URL);

    const products = await page.$$eval('div[role="listitem"]',
        (results) => (
            results.slice(0, 4).map((el) => ({
                title: el.querySelector('[data-cy="title-recipe"] span')?.textContent ?? null,
                price: el.querySelector('.a-price-whole')?.textContent ?? null,
                image: el.querySelector('.s-image')?.getAttribute('src') ?? null,
                url: 'https://www.amazon.com.mx/' + (el.querySelector('a')?.getAttribute('href') ?? '')
            }))
        )
    );

    await browser.close();

    return products;
}