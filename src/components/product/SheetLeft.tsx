'use client'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useEffect, useState } from "react"
import { JSX } from "react/jsx-runtime"
import { Product } from "../../../generated/prisma/client"
import { ProductScrapp } from "@/interfaces/product-scrapp"
import { getScrapedProductsAction } from "@/app/admin/products/actions-scrapper"
import { useScrappStore } from "@/store/product/product-scrapp"
import Image from "next/image"
import { getTerms } from "@/utils/search-terms"

interface Props {
    openButton?: JSX.Element,
    title: string,
    description?: string,
    open?: boolean,
    product: Product | null,
    onOpenChange: (value: boolean) => void
}

export function SheetLeft({ openButton, title, product, description, open = false, onOpenChange }: Props) {
    const [internalOpen, setInternalOpen] = useState(false);
    const [productsScrapp, setProductsScrapp] = useState<ProductScrapp[]>([]);
    const [loading, setLoading] = useState(false);
    const scrapState = useScrappStore();
    const getProductScrap = scrapState.getScrappsById;
    const addScrapProduct = scrapState.addProductScrapp;

    const isControlled = open !== undefined;
    const dialogOpen = isControlled ? open : internalOpen;

    const handleOpenChange = (nextOpen: boolean) => {
        if (!isControlled) setInternalOpen(nextOpen);
        onOpenChange?.(nextOpen);
    };

    const terms = getTerms(product?.name, product?.model, product?.brand, product?.year);

    const listProviders = [
        {
            name: 'Mercado Libre',
            url: `https://listado.mercadolibre.com.mx/${terms.join('-')}`,
        },
        {
            name: 'Amazon',
            url: `https://www.amazon.com.mx/s?k=${terms.join('+')}`
        },
        {
            name: 'Autozone',
            url: `https://www.autozone.com.mx/searchresult?searchText=${terms.join('+')}`
        }
    ];

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);

            const currentDate = new Date();
            const scrapProducts = await getProductScrap(product!.id);

            const searchDate = scrapProducts?.searched_at ? new Date(scrapProducts!.searched_at) : null;
            let results = null; 
            
            if(searchDate)
                searchDate.setDate(searchDate.getDate() + 10);

            if (!scrapProducts || !searchDate || currentDate > searchDate ) {
                results = await getScrapedProductsAction(product?.name ?? '', product?.model, product?.brand, product?.year ?? null);   
                addScrapProduct(results, product!.id);
            } else {
                results = scrapProducts.products;
            }

            setProductsScrapp(results)
            setLoading(false)
        }

        if (dialogOpen) {
            loadProducts()
        }
    }, [dialogOpen])

    return (
        <Sheet open={dialogOpen} onOpenChange={handleOpenChange}>
            {
                openButton && (
                    <SheetTrigger render={openButton} />
                )
            }
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className='text-xl'>{title}</SheetTitle>
                    {
                        description && (
                            <SheetDescription>
                                {description}
                                <strong>
                                    {product?.name}
                                </strong>
                            </SheetDescription>
                        )
                    }
                </SheetHeader>
                <div className="px-4">
                    <ul className="flex flex-col gap-2 text-[19px]">
                        {
                            listProviders.map(list => (
                                <li key={list.url}>
                                    <a className="text-blue-400 underline" href={list.url}>Ir a {list.name}</a>
                                </li>
                            ))
                        }
                    </ul>
                    <h2 className="my-2">Los siguientes resultados son de <strong>Amazon</strong></h2>
                    <div className="h-[55vh] sm:h-[74vh] overflow-y-scroll">
                        <div className="flex flex-col gap-2">
                            {
                                loading ? ( 
                                    <>
                                        <div key={1} className="h-20 w-[90%] animate-pulse bg-gray-300 rounded-2xl"></div>
                                        <div key={2} className="h-20 w-[90%] animate-pulse bg-gray-300 rounded-2xl"></div>
                                        <div key={3} className="h-20 w-[90%] animate-pulse bg-gray-300 rounded-2xl"></div>
                                        <div key={4} className="h-20 w-[90%] animate-pulse bg-gray-300 rounded-2xl"></div>
                                    </>
                                ) : (
                                    productsScrapp.map(productScrapp => (
                                        <div key={productScrapp.title} className="min-h-20 max-h-max w-full flex flex-col gap-1 border-b">                                            
                                            <div className="grid grid-cols-[30%_68%] gap-1 items-center">
                                                {
                                                    productScrapp.image && (
                                                        <picture>
                                                            <Image width={1000} height={1000} className="w-20 h-20 object-cover" src={productScrapp.image} alt={productScrapp.title ?? ''} />
                                                        </picture>                                                
                                                    )
                                                }                                                
                                                <a href={productScrapp.url ?? ''} className="text-wrap">
                                                    {productScrapp.title?.trim()}
                                                </a>                                            
                                            </div>
                                            <strong className="">
                                                Precion normal: ${productScrapp.price}
                                            </strong>
                                        </div>
                                    ))
                                )
                            }
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
