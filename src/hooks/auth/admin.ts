
'use client'

import { authClient } from "@/lib/auth-client";

export const isAdmin = () : boolean => {
    const user = authClient.useSession()?.data?.user;
    return user?.role === 'admin'
}