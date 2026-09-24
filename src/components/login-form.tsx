import { cn } from "cn"
import { GalleryVerticalEnd } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup, 
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { CustomSeparator } from "./ui/customSeparator"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center text-secondary!">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="size-12">
                <circle cx="12" cy="12" r="9" strokeWidth={3} />
                <circle cx="12" cy="12" r="3.5" />
                <circle cx="12" cy="12" r="0.5" fill="white" />
                <path d="M12 3v5.5M12 15.5V21M3 12h5.5M15.5 12H21M5.6 5.6l3.9 3.9M14.5 14.5l3.9 3.9M18.4 5.6l-3.9 3.9M9.5 14.5l-3.9 3.9" />
            </svg>
            <h1 className="text-xl font-bold">Bienvenido a Octo Parts.</h1>            
          </div>
          <Field>
            <Input
              className="bg-white/70 backdrop-blur"
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </Field>
          <Field>
            <Input
                className="bg-white/70 backdrop-blur"            
                id="password"
                type="password"
                placeholder="Contraseña"
                required
            />
          </Field>
          <Field>
            <Button variant='secondary' type="submit">Entrar</Button>
          </Field>
        <CustomSeparator text="O"/>
        <Field className="grid gap-4 sm:grid-cols-2">
            <Button variant="outline" type="button">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="md:pl-1">
                <path
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                    fill="currentColor"
                />
            </svg>
              Continuar con Facebook
            </Button>
            <Button variant="outline" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Continuar con Google
            </Button>
          </Field>
        </FieldGroup>
        <br/>
        <br/>
        <br/>
      </form>     
    </div>
  )
}
