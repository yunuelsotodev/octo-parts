'use client'
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { CustomSeparator } from "./ui/customSeparator"
import Image from "next/image"
import { OAuthButtons } from "./auth/ui/OAuthButtons"
import { Controller, useForm } from "react-hook-form"
import { Form } from "@base-ui/react"
import { loginSchema, LoginSchemaType } from "@/lib/zodSchemas/auth/zodSchemaLogin"
import { zodResolver } from "@hookform/resolvers/zod"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {  
  
  const onSubmit = async (data: LoginSchemaType) => {
    console.log(data);
  }

  const form = useForm<LoginSchemaType>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(loginSchema)
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <div className="flex flex-col items-center gap-2 text-center text-secondary!">
              <Image src={'/favicon.ico'} alt="logo de rueda" width={70} height={70} className="-translate-x-[300%] animate-(--spin-tire)" />
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
                  placeholder="m@example.com"
                  required
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
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
                  placeholder="Contraseña"
                  required
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>              
            )}
          />
            <Field className="animate-(--opacity-intro)">
              <Button variant='secondary' type="submit">Entrar</Button>
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
