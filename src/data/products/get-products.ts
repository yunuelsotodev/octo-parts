import { prisma } from "@/lib/db";
import { Image, Prisma, Product } from "../../../generated/prisma/client";

interface Params {
    search?: string,
    model?: string,
    brand?: string,
    minPrice?: number,
    maxPrice?: number,
    year?: number,
    page?: number,
    take?: number,
}

export const getProducts = async ({ search = '', model = '', brand = '', year, minPrice, maxPrice, page = 1, take = 10 }: Params = {}):
    Promise<Array<Product & { images: Image[] }>> => {

    const where: Prisma.ProductWhereInput = {};

    if (search && search.trim() !== '') {
        let searchYear = Number.parseInt(search);

        where.OR = [
            { name: { contains: search, mode: 'insensitive' } },
            { code: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
            { model: { contains: search, mode: 'insensitive' } },
            { brand: { contains: search, mode: 'insensitive' } },
            { year: { equals: !Number.isNaN(searchYear) ? searchYear : null } },
        ];
    }

    if (year) {
        where.year = year;
    }

    if (model && model.trim()) {
        where.model = { contains: model, mode: 'insensitive' };        
    }

    if (brand && brand.trim()) {
        where.brand = { contains: brand, mode: 'insensitive' };
    }

    if (minPrice || maxPrice) {
        where.price = {
            ...(minPrice ? { get: minPrice } : {}),
            ...(maxPrice ? { lte: maxPrice } : {})
        }
    }

    const products = prisma.product.findMany({
            where,
            take: take,
            skip: (page - 1) * take,
            include: {
                images: true
            },
            orderBy: {
              createdAt: 'desc'  
            }
        })
    
    return products;
}