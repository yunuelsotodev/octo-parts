'use client'

import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { authClient } from "@/lib/auth-client"
import { FaFacebookF } from "react-icons/fa";
import { BsGoogle } from "react-icons/bs";

export const OAuthButtons = () => {

    const onGoogleLogin = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
            callbackURL: 'http://localhost:3000/admin'
        });
    }

    const onFacebookLogin = async () => {
        const data = await authClient.signIn.social({
            provider: "facebook"
        });
    }

    return (
        <Field className="grid gap-4 sm:grid-cols-2 animate-(--opacity-intro)">
            <Button variant="outline" className='bg-blue-500! border-transparent' type="button" onClick={onFacebookLogin}>
                <FaFacebookF size={60} width={20} height={50} />
                Continuar con Facebook
            </Button>
            <Button variant="secondary" type="button" onClick={onGoogleLogin}>
                <BsGoogle/>
                Continuar con Google
            </Button>
        </Field>
    )
}
