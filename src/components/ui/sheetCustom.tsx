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
import { useIsAdmin } from "@/hooks/auth/admin"
import { resolveTitle } from "@/utils/site"
import { adminMenu, menu } from "@/utils/menu-service"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { IoIosMenu } from "react-icons/io"
import { animate } from 'animejs';
import { useEffect, useRef } from "react"

export function SheetCustom() {

  const allMenu = [...menu, ...adminMenu];
  const path = usePathname();
  const menuRes = resolveTitle(path, allMenu);

  const pillRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<ReturnType<typeof animate> | null>(null);
 
  const lastYRef = useRef<number | null>(null);

  const activePosition = menuRes?.position;

  useEffect(() => {
    if (activePosition == null) return;
    
    const pill = pillRef.current;
    
    if (!pill) {
      lastYRef.current = activePosition;
      return;
    }

    animRef.current?.cancel();
    
    if (lastYRef.current == null) {
      animate(pill, { y: activePosition, duration: 0 });
    } else {
      animRef.current = animate(pill, { y: activePosition, duration: 450, ease: 'outExpo' });
    }
    
    lastYRef.current = activePosition;

    return () => {
      animRef.current?.cancel();
    };
  }, [activePosition]);

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
            <span className="text-lg">{menuRes?.name ?? ''}</span>
          <Image src={'/favicon.ico'} alt="logo de rueda" width={30} height={30} />
        </MenubarMenu>
      </Menubar>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className='text-xl'>Menu</SheetTitle>         
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4 relative">
          <div ref={pillRef} className="booble_animate"></div>
          <div className="grid gap-1 text-lg">
            {
              menu.map(({ url, name: internalName, icon: Icon }) => {
                return (
                  <Link key={url} href={url} className={`z-10 m-2 flex flex-row gap-2 items-center transition-all duration-75 ${internalName === menuRes?.name ? 'scale-[1.05]' : ''}`}>
                    <Icon />
                    <span>{internalName}</span>
                  </Link>
                )
              })
            }          
          </div>
          { 
            adminMenu.length > 0 && useIsAdmin() && (
              <span className="w-full h-px bg-gray-300"></span>
            )
          }
          <div className="grid gap-1 text-lg">
            {
              useIsAdmin() && adminMenu.map(({ url, name: internalName, icon: Icon }) => (
                <Link key={url} href={url} className={`m-2 flex flex-row gap-2 items-center transition-all duration-75 ${internalName === menuRes?.name ? 'scale-[1.05]' : ''}`}>                  
                  <Icon/>
                  <span>{internalName}</span>
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
