'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Menubar,
  MenubarMenu,
} from "@/components/ui/menubar"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { isAdmin } from "@/hooks/auth/admin"
import { authClient } from "@/lib/auth-client"
import { resolveTitle } from "@/lib/site"
import { adminMenu, menu } from "@/utils/menu-service"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { IoIosMenu } from "react-icons/io"


export function SheetCustom() {

  const allMenu = [...menu, ...adminMenu];
  const path = usePathname();
  const name = resolveTitle(path, allMenu);
  
  return (
    <Sheet>
      <Menubar className="w-full rounded-none h-12 justify-between">
        <MenubarMenu>
          <SheetTrigger
            render={
              <button
                type="button"
                aria-label="Abrir menú"
                className="cursor-pointer"
              >
                <IoIosMenu size={30} />
              </button>
            }
          />
        </MenubarMenu>
        <MenubarMenu>
            <span className="text-lg">{name}</span>
          <Image src={'/favicon.ico'} alt="logo de rueda" width={30} height={30} />
        </MenubarMenu>
      </Menubar>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className='text-xl'>Menu</SheetTitle>         
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-1 text-lg">
            {
              menu.map(({url, name, icon: Icon}) => (
                <Link key={url} href={url} className="m-2 flex flex-row gap-1 items-center">                  
                  <Icon/>
                  <span>{name}</span>
                </Link>
              ))
            }          
          </div>
          { 
            adminMenu.length > 0 && isAdmin() && (
              <span className="w-full h-px bg-gray-300"></span>
            )
          }
          <div className="grid gap-1 text-lg">
            {
              isAdmin() && adminMenu.map(({ url, name, icon: Icon }) => (
                <Link key={url} href={url} className="m-2 flex flex-row gap-1 items-center">                  
                  <Icon/>
                  <span>{name}</span>
                </Link>
              ))
            }
          </div>
        </div>
        <SheetFooter>
          {/* TODO: Profile edit and verification email */}
          <Link href={''} className="w-full"> 
            <Button type="button" className='w-full'>Editar perfil</Button>
          </Link>
          {/* TODO: Close session */}
          <Link href={''} className="w-full">
            <Button variant="outline" className='w-full'>Cerrar sesion</Button>         
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
