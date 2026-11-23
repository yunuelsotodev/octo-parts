import z from "zod";

export const productToCartSchema = z.object({
    cartname: z.string().min(1, "El nombre del carrito es obligatorio"),
    amount: z.number().min(1, "La cantidad tiene que ser de almenos 1"),
});

export type ProductToCartType = z.infer<typeof productToCartSchema>;