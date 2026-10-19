import React from 'react'
import { Image as Img, Product } from '../../../../../generated/prisma/client'
import Image from 'next/image'
import { formatCurrency } from '@/utils/formart-currecny'
import { IoIosArrowDown } from 'react-icons/io'
import { BsCartPlus } from 'react-icons/bs'
import { FaShareSquare } from 'react-icons/fa'
import { FaRegShareFromSquare } from 'react-icons/fa6'

interface Props {
  products: Array<Product & {images: Img[]}>
}

export default function CartProducts({products} : Props) {

  return (
    <div className='flex flex-col gap-2 justify-center items-start'> 
      {
        products.map(product => (
          <div key={product.slug} className='h-auto rounded-2xl shadow-gray-300 shadow-[3px_3px_4px_1px] w-full p-2'>
            <Image className='h-50 w-full object-cover rounded-2xl' src={product.images[0].url} alt={product.slug} height='1000' width='1000' />
            <div className='mt-2'>
              <div className='flex flex-row justify-between'>
                <h4 className='text-2xl'>
                  {product.name}
                </h4>
                <h4 className='text-2xl text-green-700'>
                  {formatCurrency(product.price)}
                </h4>
              </div>
              <ul className='ml-6 list-disc'>
                {
                  product.brand && (
                    <li>
                      <strong>Marca: </strong> <span>{product.brand}</span>
                    </li>
                  )
                }
                {
                  product.model && (
                    <li>
                      <strong>Modelo: </strong> <span>{product.model}</span>
                    </li>
                  )
                }
                {
                  product.year && (
                    <li>
                      <strong>Año: </strong> <span>{product.year}</span>
                    </li>
                  )
                }
                {
                  product.description && (
                    <li>
                      <strong>Descripción: </strong> <span>{product.description}</span>                  
                    </li>
                  )
                }
                {
                  product.code && (
                    <li>
                      <strong>Numero de parte: </strong> <span>{product.code}</span>
                    </li>
                  )
                }
              </ul>              
            </div>
            <div className='flex flex-row justify-between p-2 pb-0 items-center'>
              <span className='text-blue-400 flex flex-row items-center justify-center'>
                Ver otros precios
                <IoIosArrowDown/>
              </span>
              <div className='flex flex-row items-center gap-2'>
                <span className='rounded-full active:bg-blue-300 active:text-amber-50 p-2 transition-all duration-100'>
                  <FaRegShareFromSquare size={30}/>
                </span>
                <span className='rounded-full active:bg-blue-300 active:text-amber-50 p-2 transition-all duration-100'>
                  <BsCartPlus size={30}/>
                </span>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}
