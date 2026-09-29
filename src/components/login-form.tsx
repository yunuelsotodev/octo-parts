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
import { OAuthButtons } from "./auth/ui/OAuthButtons"
import { Controller, useForm } from "react-hook-form"
import { Form } from "@base-ui/react"
import { loginSchema, LoginSchemaType } from "@/lib/zodSchemas/auth/zodSchemaLogin"
import { zodResolver } from "@hookform/resolvers/zod"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { CustomSeparator } from "./ui/CustomSeparator"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {  
  
  const onSubmit = async (data: LoginSchemaType) => {
    const res = await authClient.signIn.email({
      email: data.email,
      password: data.password
    });

    console.log(res);
  }

  const form = useForm<LoginSchemaType>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(loginSchema)
  });

  const router = useRouter();
  // La sesión se resuelve async: mientras tanto server y cliente pintan
  // exactamente lo mismo (el form). El redirect va en efecto, nunca en render,
  // o rompe la hidratación cuando la sesión llega a mitad del hydrate.
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && session?.user) {
      router.replace('/admin');
    }
  }, [isPending, session, router]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
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
                  autoComplete="current-password"
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
