'use server'
import { prisma } from "@/lib/db";
import { Image, Prisma, Product } from "../../../generated/prisma/client";
import { ProductFilters } from "@/interfaces/product-filters";

interface Params extends Partial<ProductFilters> {
    page?: number,
    take?: number,
}

export const getProducts = async ({
    search = '',
    models = [],
    brands = [],
    years = [],
    minPrice,
    maxPrice,
    minStock,
    maxStock,
    page = 1,
    take = 10,
}: Params = {}): Promise<Array<Product & { images: Image[] }>> => {

    const where: Prisma.ProductWhereInput = {};
    const conditions: Prisma.ProductWhereInput[] = [];

    if (search.trim() !== '') {
        const searchTerms = search.trim().split(/\s+/).filter(Boolean);

        conditions.push({
            OR: searchTerms.map((term): Prisma.ProductWhereInput => {
                const searchYear = Number.parseInt(term, 10);

                return {
                    OR: [
                        { name: { contains: term, mode: 'insensitive' } },
                        { code: { contains: term, mode: 'insensitive' } },
                        { description: { contains: term, mode: 'insensitive' } },
                        { model: { contains: term, mode: 'insensitive' } },
                        { brand: { not: null, contains: term, mode: 'insensitive' } },
                        ...(Number.isNaN(searchYear) ? [] : [{ year: { equals: searchYear } }]),
                    ]
                };
            }),
        });
    }

    if (years.length > 0) {
        conditions.push({ year: { in: years } });
    }

    if (models.length > 0) {
        conditions.push({
            OR: models.map((model): Prisma.ProductWhereInput => ({
                model: { contains: model, mode: 'insensitive' }
            })),
        });
    }

    if (brands.length > 0) {
        conditions.push({
            OR: brands.map((brand): Prisma.ProductWhereInput => ({
                brand: { contains: brand, mode: 'insensitive' }
            })),
        });
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
        conditions.push({
            price: {
                ...(minPrice !== undefined ? { gte: minPrice } : {}),
                ...(maxPrice !== undefined ? { lte: maxPrice } : {}),
            }
        });
    }

    if (minStock !== undefined || maxStock !== undefined) {
        conditions.push({
            stock: {
                ...(minStock !== undefined ? { gte: minStock } : {}),
                ...(maxStock !== undefined ? { lte: maxStock } : {}),
            }
        });
    }

    if (conditions.length > 0) {
        where.AND = conditions;
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
