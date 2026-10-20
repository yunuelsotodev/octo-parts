'use server'
import { APIResponse } from "@/interfaces/apiResponse";
import { prisma } from "@/lib/db";
import { deleteImageR2, submitImageR2 } from "@/lib/server/r2-actions";
import { productSchema, ProductSchemaType } from "@/lib/zodSchemas/product/zodSchemaProduct";
import { slugConverter } from "@/utils/sulg-converter";
import { revalidatePath } from "next/cache";

export const createProduct = async (values: ProductSchemaType): Promise<APIResponse> => {

    const validator = productSchema.safeParse(values);

    if (!validator.success) {
        return {
            status: 500,
            message: 'Datos invalidos',
        }
    }

    const data = validator.data;
    const slug = slugConverter(data.name);

    const { images, imageRemoves, updateP: _update, ...productData } = data;

    try {
        const imageResponse = await submitImageR2(images);

        if (imageResponse.status == 200 && imageResponse.images && imageResponse.images?.length > 0) {
            await prisma.$transaction(async (tx) => {

                const product = await tx.product.create({
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
            status: 500,
            message: 'Error al guardar el producto'
        }
    }

    return {
        status: 200,
        message: 'Producto guardado con exito.',
    }
}

export const updateProduct = async (values: ProductSchemaType, id: string): Promise<APIResponse> => {
    const validator = productSchema.safeParse(values);

    if (!validator.success) {
        return {
            status: 500,
            message: 'Datos invalidos',
        }
    }

    const data = validator.data;
    const slug = slugConverter(data.name);

    const { images, imageRemoves, updateP: _update, ...productData } = data;

    try {
        let imageResponse = null;

        const product = await prisma.product.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                images: {
                    select: {
                        id: true
                    }
                }
            }
        });

        if (!product) {
            return {
                status: 500,
                message: 'Producto no encontrado'
            }
        }

        if (images.length === 0 && imageRemoves.length === product.images.length) { 
            return {
                status: 500,
                message: 'El producto no se puede quedar sin imagen de referencia'
            }
        }

        if (images.length > 0) {
            imageResponse = await submitImageR2(images);            
        }

        await prisma.$transaction(async (tx) => {

            const product = await tx.product.update({
                where: {
                    id: id
                },
                data: {
                    ...productData,
                    slug: slug
                },              
            });

            if (images.length > 0 && imageResponse) {
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
            }

            const imageIDs = imageRemoves.map(img => img.id);           

            if (imageIDs.length > 0) {
                const whereCondition = {
                    id: {
                        in: imageIDs
                    }
                };

                const imgRemoves = await tx.image.findMany({
                    where: whereCondition
                });

                for (const img of imgRemoves) {
                    await deleteImageR2(img.fullName);
                }

                await tx.image.deleteMany({
                    where: whereCondition
                });
            }
        });

        revalidatePath('products');


    } catch (e) {
        console.error(e);
        return {
            status: 500,
            message: 'Error al guardar el producto'
        }
    }

    return {
        status: 200,
        message: 'Producto guardado con exito.',
    }
}

export const deleteProduct = async (id: string): Promise<APIResponse> => {
    
    const product = await prisma.product.findFirst({
        where: { id },
        include: {
            images: true
        }
    });

    if (!product) {
        return {
            status: 500,
            message: 'El Producto no existe.'
        }
    }

    for (const image of product.images) {
        await deleteImageR2(image.fullName);
    }

    await prisma.product.delete({
        where: {id}
    });

    revalidatePath('products');

    return {
        status: 200,
        message: 'Producto eliminado'
    }
}