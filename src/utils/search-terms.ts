import { Product } from "../../generated/prisma/client";

export function getTerms(name: string | null = '', model: string | null = '', brand: string | null = '', year: number | null | undefined): (string | undefined)[]
{
    const newName = name?.replace(/\s+/g, '+').toLowerCase();
    const newModel = model?.replace(/\s+/g, '+').toLowerCase();
    const newBrand = brand?.replace(/\s+/g, '+').toLowerCase();
    const stringYear = year ? `${year}` : '';
    const newYear = stringYear.replace(/\s+/g, '+');

    return [newName, newBrand, newModel, newYear].filter(Boolean);
}