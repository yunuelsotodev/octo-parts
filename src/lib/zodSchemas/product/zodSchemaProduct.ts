import z from "zod";

export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const imageSchema = z.object({
    id: z.nanoid(),
    file: z.file()
        .mime([...ACCEPTED_IMAGE_TYPES], "Solo se permiten imagenes")
        .max(MAX_FILE_SIZE, "Cada imagen debe pesar menos de 5MB"),
});

export const imageRemoveSchema = z.object({
    id: z.nanoid(),
});

export const productSchema = z.object({
    images: z
        .array(imageSchema)
        .min(1, { message: 'Debes seleccionar al menos una imagen' })
        .max(5, { message: 'Solo puedes subir 5 imagenes por articulo' }),   
    imageRemoves: z
        .array(imageRemoveSchema),        
    name: z
        .string()
        .min(1, {message: "El nombre es obligatorio"}),
    brand: z
        .string(),
    model: z
        .string(),
    year: z
        .number()
        .optional(),
    description: z
        .string()
        .min(1, {message: "La descripcion es obligatoria"}),
    price: z
        .number({message: 'El precio debe de ser un numero'})
        .min(0, { message: "El precio debe ser mayor a 0"}),
    stock: z
        .number({ message: "El stock debe de ser un numero" })
        .int({message: 'El stock debe de ser un numero entero'})
        .min(0, {message:"La cantidad en stock debe de ser mayor a 0"}),
    code: z
        .string(),
});

export type ProductSchemaType = z.infer<typeof productSchema>
export type ImageSchemaType = z.infer<typeof imageSchema>
