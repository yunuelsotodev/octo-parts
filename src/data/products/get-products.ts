'use server'
import { prisma } from "@/lib/db";
import { Image, Prisma, Product } from "../../../generated/prisma/client";

interface Params {
    search?: string,
    models?: string[],
    brands?: string[],
    minPrice?: number,
    maxPrice?: number,
    years?: number[],
    page?: number,
    take?: number,
}

export const getProducts = async ({ search = '', models = [], brands = [], years = [], minPrice, maxPrice, page = 1, take = 10 }: Params = {}):
    Promise<Array<Product & { images: Image[] }>> => {

    const where: Prisma.ProductWhereInput = {};

    if (search && search.trim() !== '') {
        const searchTerms = search.trim().split(/\s+/).filter(Boolean);

        where.AND = searchTerms.map(term => {
            let searchYear = Number.parseInt(term);

            return {
                OR: [
                    { name: { contains: term, mode: 'insensitive' } },
                    { code: { contains: term, mode: 'insensitive' } },
                    { description: { contains: term, mode: 'insensitive' } },
                    { model: { contains: term, mode: 'insensitive' } },
                    { brand: { not: null, contains: term, mode: 'insensitive' } },
                    { year: { equals: !Number.isNaN(searchYear) ? searchYear : undefined } },
                ]
            };
        });
    }

    if (years.length > 0) {
        for (const year of years) {
            where.year = year;           
        }        
    }

    if (models.length > 0) {
        for (const model of models) {
            where.model = { contains: model, mode: 'insensitive' };            
        }
    }

    if (brands.length > 0) {
        for (const brand of brands) {
            where.brand = { contains: brand, mode: 'insensitive' };            
        }
    }

    if (minPrice || maxPrice) {
        where.price = {
            ...(minPrice ? { gte: minPrice } : {}),
            ...(maxPrice ? { lte: maxPrice } : {})
        }
    }

    const products = await prisma.product.findMany({
        where,
        take: take,
        skip: (page - 1) * take,
        include: {
            images: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return products;
}