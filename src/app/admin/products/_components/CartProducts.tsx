'use client'
import { Brand, Image as Img, Model, Product } from '../../../../../generated/prisma/client'
import Image from 'next/image'
import { formatCurrency } from '@/utils/formart-currecny'
import { IoIosArrowDown } from 'react-icons/io'
import { BsCartPlus } from 'react-icons/bs'
import { FaRegShareFromSquare } from 'react-icons/fa6'
import { Option } from '@/interfaces/option'
import { useCallback, useState } from 'react';
import ProductCart from './ProductCart'
import { ModalAdd } from '@/components/features/modalAdd'
import BodyFormProduct from './BodyFormProduct'
import { SheetLeft } from '@/components/product/SheetLeft'

interface Props {
  products: Array<Product & { images: Img[] }>,
  brands: Array<Brand & { models: Model[] }>,
  models: Model[],
  years: Option[],
}

export default function CartProducts({products, brands, models, years} : Props) {

  const [open, setOpen] = useState(false);
  const [openSheet, setOpenSheet] = useState(false);  

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = products.find(p => p.id === selectedId) ?? null;

  const handleOpen = useCallback((id: string) => {
    setSelectedId(id);
    setOpen(true);
  }, []);

  const handleOpenChange = useCallback((nextOpen: boolean) => {
    setOpen(nextOpen);
  }, []);

  const handleOpenSheet = useCallback((id: string) => {
    setSelectedId(id);
    setOpenSheet(true);
  }, []);

  const handleOpenSheetChange = useCallback((nextOpen: boolean) => {
    setOpenSheet(nextOpen);
  }, []);

  return (
    <>
      <div className='flex flex-col gap-2 justify-center items-start'> 
        {
          products.map(product => (
            <ProductCart product={product} key={product.id} onOpen={handleOpen} onOpenSheet={handleOpenSheet} />
          ))
        }
      </div>
      <ModalAdd
        open={open}
        onOpenChange={handleOpenChange}
        title="Editar producto"
        formBody={
          <BodyFormProduct
            key={selectedId ?? 'new'}
            product={selected ?? undefined}
            brands={brands}
            models={models}
            years={years}
          />
        }
      />
      <SheetLeft
        open={openSheet}
        title="Lista de precios"
        product={selected}
        description='Resultados de busqueda en otros sitios de '
        key={selectedId ?? 'new'}
        onOpenChange={handleOpenSheetChange}
      />
    </>
  )
}
