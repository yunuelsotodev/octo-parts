import z from "zod";

export const loginSchema = z.object({
    email: z.email("El correo es obligatorio"),
    password: z.string().min(8, "La contraseña es obligatoria y debe tener mas de 8 caracteres"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>