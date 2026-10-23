import { ProductScrapp } from "@/interfaces/product-scrapp";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ScrapData {
    products: ProductScrapp[],
    searched_at: Date,
}

interface State {
    productsScrapp: Record<string, ScrapData>,   
    addProductScrapp: (product: ProductScrapp[], id_product: string) => void,
    getScrappsById: (id_product: string) => ScrapData | null
}

export const useScrappStore = create<State>()(
    persist(
        (set, get) => ({
            productsScrapp: {},

            addProductScrapp: (products: ProductScrapp[], id_product: string) => {
                set((state) => ({
                    productsScrapp: {
                        ...state.productsScrapp,
                        [id_product]: {
                            products,
                            searched_at: new Date(),
                        }
                    }
                }))
            },

            getScrappsById: (id_product: string) => {
                return get().productsScrapp[id_product];
            }
        }),
        {
            name: 'product-scrapp'
        }
    )
)