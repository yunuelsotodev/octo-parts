import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { getUser } from "@/utils/getUserServe";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Octo Parts",
  description: "Octo parts admin panel",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {

  const user = await getUser();

  if (user) {
    redirect('/admin');
  }

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col layout-auth">
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
