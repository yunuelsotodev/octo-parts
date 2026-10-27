'use client'
import { CiFilter } from "react-icons/ci";
import SearchInput from "@/components/ui/SearchInput";
import { ModalAdd } from "@/components/features/modalAdd";
import { Button } from "@/components/ui/button";
import BodyFormProduct from "./BodyFormProduct";
import CartProducts from "./CartProducts";
import { Brand, Image, Model, Product } from "../../../../../generated/prisma/client";
import { Option } from "@/interfaces/option";
import { useState } from "react";
import { getProducts } from "@/data/products/get-products";
import Filters from "@/components/product/Filters";
import SheetCustom from "@/components/features/SheetCustom";
import { FaFilter } from "react-icons/fa6";

interface Props {
    models: Model[]
    brands: Array<Brand & { models: Model[] }>
    years: Option[]
    products: Array<Product & { images: Image[] }>
}

interface Filters {
    name: string,
    value: string
}

export default function BodyProductHome({ models, brands, years, products }: Props) {

    const [productsState, setProductsState] = useState<Array<Product & { images: Image[] }>>(products);
    const [brandF, setBrandF] = useState<string[]>([]);
    const [modelF, setModelF] = useState<string[]>([]);
    const [yearF, setYearF] = useState<number[]>([]);
    const [restFilters, setRestFilters] = useState<Filters[]>([])    

    const handleFilters = async (value: string[], name: string) => {
        console.log(name ?? 'EMPTY', value ?? 'EMPTY');
        
        handleDesition(value, name);

        const minPrice = restFilters.find(filter => filter.name === 'priceM')?.value;
        const maxPrice = restFilters.find(filter => filter.name === 'priceL')?.value;

        const products = await getProducts({
            search: restFilters.find(filter => filter.name === 'search')?.value ?? '',
            brands: brandF,
            models: modelF,
            years: yearF,
            minPrice: minPrice ? Number.parseFloat(minPrice) : undefined,
            maxPrice: maxPrice ? Number.parseFloat(maxPrice) : undefined
        });
         
        setProductsState(products);
    }

    const handleDesition = (value: string[], name: string) => {
        switch (name) {
            case 'brands':
                setBrandF(value);
                break;
            case 'models':
                setModelF(value);
                break;           
            case 'years':
                const array = value.map(v => (
                    Number.parseInt(v)              
                ));

                setYearF(array)
                break;
            case 'clear':
                setYearF([]);
                setModelF([]);
                setBrandF([]);
                setRestFilters([]);
            default:

                setRestFilters([{value: value[0], name: name}])
                break;
        }     
    }
    
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
                                    brandF.length > 0 || modelF.length > 0 || yearF.length > 0 ? (
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
                                handleFilters={handleFilters}
                                modelsF={modelF}
                                brandsF={brandF}
                                yearsF={yearF} 
                                restFilters={restFilters}
                            />
                        }
                    />
                    <SearchInput
                        placeholder="Buscar parte"
                        searchFunction={(value) => handleFilters([value], 'search')}
                        value={restFilters.find(filter => filter.name === 'search')?.value ?? ''}
                        animate={true}
                    />
                </div>
                <ModalAdd
                    button={<Button className='text-base h-30!'>+ Pieza nueva</Button>}
                    formBody={<BodyFormProduct brands={brands} models={models} years={years} />}
                    title="Agregar producto"
                />                
            </section>
            <section className="overflow-y-scroll flex-1 min-h-0 px-2">
                <CartProducts products={productsState} brands={brands} models={models} years={years} />
                <br />
                <br />
                <br />
            </section>
        </>
    )
}
