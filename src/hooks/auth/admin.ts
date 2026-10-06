
'use client'

import { authClient } from "@/lib/auth-client";

export const useIsAdmin = () : boolean => {
    const user = authClient.useSession()?.data?.user;
    return user?.role === 'admin'
}