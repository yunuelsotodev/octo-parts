import { prisma } from "@/lib/db";
import { Brand, Model } from "../../../generated/prisma/client";

export const getBrands = async () : Promise<Array<Brand & {models: Model[]}>> => {
    const brands = await prisma.brand.findMany({
        include: {
            models: true
        }
    });
    return brands;
}