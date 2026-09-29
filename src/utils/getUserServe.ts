import { auth } from "@/lib/auth";
import { User } from "../../generated/prisma/client";
import { headers } from "next/headers";

export const getUser = async (): Promise<User|null> => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    return session?.user as User;
}