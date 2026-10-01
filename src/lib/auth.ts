import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";
import { prisma } from "./db";

export const auth = betterAuth({
    database: prismaAdapter(prisma, { provider: "postgresql" }),
    baseURL: process.env.BETTER_AUTH_URL!,
    secret: process.env.BETTER_AUTH_SECRET!,
    trustedOrigins: [
      "http://localhost:3000",
      "https://emotional-dis-emerging-velocity.trycloudflare.com",
    ],

    emailAndPassword: { enabled: true },
    user: {
        additionalFields: {
            role: { type: "string", defaultValue: "user" }
        }
    },
    plugins: [
        admin({
            defaultRole: "user",
            adminRoles: ["admin"]
        }),
    ],
    
    socialProviders: {
        facebook: { 
            clientId: process.env.FACEBOOK_CLIENT_ID as string, 
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string, 
        }, 
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }, 
    },
    account: {
        accountLinking: {
            enabled: true,
            trustedProviders: ['google', 'facebook'],
            allowDifferentEmails: false,            
            // requireLocalEmailVerified: false,
        }
    },
});