'use server'
import { APIResponse } from "@/interfaces/apiResponse";
import { prisma } from "@/lib/db";
import { submitImageR2 } from "@/lib/server/r2-actions";
import { productSchema, ProductSchemaType } from "@/lib/zodSchemas/product/zodSchemaProduct";
import { slugConverter } from "@/utils/sulg-converter";
import { revalidatePath } from "next/cache";

export const createProduct = async (values: ProductSchemaType) : Promise<APIResponse> => {

    const validator = productSchema.safeParse(values);

    if (!validator.success) {
        return {
            status: 500,
            message: 'Datos invalidos',
        }
    }

    const data = validator.data;
    const slug = slugConverter(data.name);        
    
    const { images, imageRemoves, ...productData } = data;
    
    try {
        const imageResponse = await submitImageR2(images);    
        
        if (imageResponse.status == 200 && imageResponse.images && imageResponse.images?.length > 0) {
            await prisma.$transaction(async (tx) => {
    
                const product = await prisma.product.create({
                    data: {
                        ...productData,
                        slug: slug
                    }
                });
    
                await tx.image.createMany({
                    data: imageResponse.images!.map(image => ({
                        id: image.id!,
                        shortName: image.shortName!,
                        fullName: image.fullName!,
                        extension: image.extension!,
                        url: image.url!,
                        productId: product.id
                    }))
                });
            });   
            
            revalidatePath('products');
        } else {
            return {
                status: 500,
                message: 'No se pudo guardar el producto, debido a que fallo el proceso de subir imagen.'
            }
        }

    } catch (e) {
        return {
            status: 200,
            message: 'Error al guardar el producto'
        }
    }

    return {
        status: 200,
        message: '',
    }
}