'use client'
import { CiFilter } from "react-icons/ci";
import SearchInput from "@/components/ui/SearchInput";
import { ModalAdd } from "@/components/features/modalAdd";
import { Button } from "@/components/ui/button";
import BodyFormProduct from "./BodyFormProduct";
import CartProducts from "./CartProducts";
import { Brand, Image, Model, Product } from "../../../../../generated/prisma/client";
import { Option } from "@/interfaces/option";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import Filters from "@/components/product/Filters";
import SheetCustom from "@/components/features/SheetCustom";
import { FaFilter } from "react-icons/fa6";
import { ProductFilters } from "@/interfaces/product-filters";
import { buildProductFilterParams, hasActiveFilters, parseProductFiltersFromSearchParams } from "@/utils/product-filters";

interface Props {
    models: Model[]
    brands: Array<Brand & { models: Model[] }>
    years: Option[]
    products: Array<Product & { images: Image[] }>
    filters: ProductFilters
}

export default function BodyProductHome({ models, brands, years, products, filters }: Props) {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const applyFilters = (patch: Partial<ProductFilters>) => {
        const nextFilters = {
            ...parseProductFiltersFromSearchParams(searchParams),
            ...patch,
        };

        const params = buildProductFilterParams(nextFilters);
        const query = params.toString();

        startTransition(() => {
            router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
        });
    };

    const clearFilters = () => {
        startTransition(() => {
            router.replace(pathname, { scroll: false });
        });
    };

    return (
        <>
            <section className="my-2 mx-2 flex shrink-0 flex-row justify-between items-center gap-2">
                <div className="flex flex-row gap-1 items-center">
                    <SheetCustom
                        title="Filtros"
                        side="top"
                        button={
                            <button type="button">
                                {
                                    hasActiveFilters(filters) ? (
                                        <FaFilter size={25} />
                                    ): (
                                        <CiFilter size={35} />
                                    )
                                }
                            </button>
                        }
                        body={
                            <Filters
                                years={years}
                                models={models}
                                brands={brands}
                                filters={filters}
                                onFiltersChange={applyFilters}
                                onClear={clearFilters}
                            />
                        }
                    />                    
                    <SearchInput
                        placeholder="Buscar parte"
                        searchFunction={(value) => applyFilters({ search: value })}
                        value={filters.search}
                        animate={true}
                    />
                </div>
                <ModalAdd
                    button={<Button className='text-base'>+ Pieza nueva</Button>}
                    formBody={<BodyFormProduct brands={brands} models={models} years={years} />}
                    title="Agregar producto"
                />                
            </section>
            <section
                className={`overflow-y-scroll flex-1 min-h-0 px-2 transition-opacity ${isPending ? 'opacity-60' : 'opacity-100'}`}
                aria-busy={isPending}
            >
                <CartProducts products={products} brands={brands} models={models} years={years} />
                <br />
                <br />
                <br />
            </section>
        </>
    )
}
