import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { redirect } from "next/navigation";
import { getUser } from "@/utils/getUserServe";
import { Toaster } from "@/components/ui/sonner";
import { SheetCustom } from "@/components/ui/sheetCustom";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Octo parts",
    description: "Octo parts point of sale and admin panel",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {

    const user = await getUser();

    if (!user) {
        redirect('/login');
    }

    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col bg-background">
                <SheetCustom/>
                {children}
                <Toaster />
            </body>
        </html>
    );
}
