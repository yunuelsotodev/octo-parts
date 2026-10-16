import { prisma } from "@/lib/db";
import { Model } from "../../../generated/prisma/client";

export const getModels = async () : Promise<Model[]> => {
    const models = prisma.model.findMany();
    return models;
}