import z from "zod";

export const loginSchema = z.object({
    email: z.string(),
    password: z.string()
});

// TODO: DEFINIR MESSAGES

export type LoginSchemaType = z.infer<typeof loginSchema>