import { formatCurrency } from '@/utils/formart-currecny'
import { BsCartPlus } from 'react-icons/bs'
import { FaRegShareFromSquare } from 'react-icons/fa6'
import { IoIosArrowDown } from 'react-icons/io'
import { Image as Img, Product } from '../../../../../generated/prisma/client'
import { memo } from 'react'
import ProductImageGallery from '@/components/product/ProductImageGallery'

interface Props {
    product: Product & { images: Img[] },
    onOpen?: (value: string) => void,
    onOpenSheet?: (value: string) => void,
}

function ProductCart({product, onOpen, onOpenSheet} : Props) {
    return (
        <div key={product.slug} className='h-auto rounded-2xl shadow-gray-300 shadow-[3px_3px_4px_1px] w-full p-2'>
            {/* <Image className='h-50 w-full object-cover rounded-2xl' src={product.images[0].url} alt={product.slug} height='1000' width='1000' /> */}
            <ProductImageGallery images={product.images} alt={product.name} />
            <div className='mt-2' onClick={() => onOpen?.(product.id)}>
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
                    <li>
                        <strong>Disponibles: </strong> <strong className={product.stock > 0 ? `text-blue-500` : `text-red-500`}>{product.stock}</strong>
                    </li>
                </ul>
            </div>
            <div className='flex flex-row justify-between p-2 pb-0 items-center'>
                <span className='text-blue-400 flex flex-row items-center justify-center' onClick={() => onOpenSheet?.(product.id)}>
                    Ver otros precios
                    <IoIosArrowDown />
                </span>
                <div className='flex flex-row items-center gap-2'>
                    <span className='rounded-full active:bg-blue-300 active:text-amber-50 p-2 transition-all duration-100'>
                        <FaRegShareFromSquare size={25} />
                    </span>
                    <span className='rounded-full active:bg-blue-300 active:text-amber-50 p-2 transition-all duration-100'>
                        <BsCartPlus size={25} />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default memo(ProductCart);
