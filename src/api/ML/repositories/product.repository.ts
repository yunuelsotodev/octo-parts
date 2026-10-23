import { ProductScrapp } from '@/interfaces/product-scrapp';
import { Root } from '../infrastructure/mercadolibre.types';
import { ProductDetail } from '../infrastructure/mercadolibre.detail.types';
import { mapperProductScrapp } from '../infrastructure/mercadolibre.detail.mapper';

export async function searchMercadoLibreAPI(terms: (string | undefined)[]): Promise<ProductScrapp[]> {
    const query = terms.filter(Boolean).join(' ');
    if (!query.trim()) return [];

    try {
        // 1. Solicitamos el Token de Acceso usando tus credenciales reales
        const accessToken = await getAccessTokenML();

        if (accessToken === '') {
            return [];
        }

        // 2. Realizamos la búsqueda utilizando el token generado en los headers
        const searchUrl = `https://api.mercadolibre.com/products/search?site_id=MLM&status=active&q=${encodeURIComponent(query)}&limit=5`;
        const response = await fetch(searchUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json'
            }
        });

        const data : Root = await response.json();        

        if (!response.ok || !data.results || data.results.length === 0) {
            console.warn(`⚠️ No se encontraron resultados o hubo un error en la búsqueda para: "${query}"`);
            return [];
        }        

        const productScrapper: ProductScrapp[] = [];

        for (const product of data.results) {
            const productDetail = await getProductByID(product.catalog_product_id, accessToken);    
            if (productDetail) {
                const mappedProductD = mapperProductScrapp(productDetail);
                productScrapper.push(mappedProductD);                
            }
        }

        return productScrapper;

    } catch (error) {
        console.error('Error de red o ejecución en la API de Mercado Libre:', error);
        return [];
    }
}

async function getAccessTokenML(): Promise<string> {
    const clientId = process.env.API_ML_ID;
    const clientSecret = process.env.API_ML_SECRET;

    const tokenResponse = await fetch('https://api.mercadolibre.com/oauth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: clientId!,
            client_secret: clientSecret!
        })
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenData.access_token) {
        console.error('❌ Error al autenticar con las credenciales de Mercado Libre:', tokenData);
        return '';
    }

    const accessToken = tokenData.access_token;

    return accessToken;
}

export async function getProductByID(catalog_id: string, accessToken: string)
{
    const response = await fetch(`https://api.mercadolibre.com/items/${catalog_id}/price_to_win?version=v2`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json'
        }
    });

    const data: ProductDetail = await response.json();         

    return data;
}