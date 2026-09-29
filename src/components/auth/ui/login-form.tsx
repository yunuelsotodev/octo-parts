'use client'
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { OAuthButtons } from "./OAuthButtons"
import { Controller, FieldErrors, useForm } from "react-hook-form"
import { loginSchema, LoginSchemaType } from "@/lib/zodSchemas/auth/zodSchemaLogin"
import { zodResolver } from "@hookform/resolvers/zod"
import { authClient } from "@/lib/auth-client"
import { CustomSeparator } from "../../ui/CustomSeparator"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {  
  
  const router = useRouter();

  const onSubmit = async (data: LoginSchemaType) => {

    const res = await authClient.signIn.email({
      email: data.email,
      password: data.password
    });

    if (!res.error) {
      router.push('/admin');
    } else {
      const errorM = res.error.status === 401 ? 'Credenciales incorrectas' : 'Error en el servidor, intentelo más tarde';
      toast.error(errorM,{ position: 'top-center' });
    } 
  }

  const form = useForm<LoginSchemaType>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(loginSchema)
  });

  const onInvalid = (errors: FieldErrors<LoginSchemaType>) => {
      Object.values(errors).forEach((error) => {
        if (error?.message) {
          toast.error(error.message, { position: 'top-center' });
        }
      });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
        <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} noValidate>
          <FieldGroup>
            <div className="flex flex-col items-center gap-2 text-center text-secondary!">
              <Image src={'/favicon.ico'} alt="logo de rueda" width={70} height={70} className="translate-x-[-300%] animate-(--spin-tire)" />
              <h1 className="text-xl font-bold animate-(--opacity-intro)">Bienvenido a Octo Parts.</h1>
          </div>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="animate-(--opacity-intro)" data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  className="bg-white/70 backdrop-blur"
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="m@example.com"
                  required
                />   
              </Field>              
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="animate-(--opacity-intro)" data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  className="bg-white/70 backdrop-blur"
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Contraseña"
                  required
                />                
              </Field>              
            )}
          />
            <Field className="animate-(--opacity-intro)">
            <Button variant='secondary' type="submit" disabled={form.formState.isSubmitting}>
              {
                form.formState.isSubmitting ? (
                  'Entrando'
                ): (
                  'Entrar'
                )
              }              
            </Button>
            </Field>
            <CustomSeparator text="O" />
            <OAuthButtons />
          </FieldGroup>
          <br />
          <br />
          <br />
        </form>
    </div>
  )
}
