'use client'
import { Button } from "@/components/ui/button"
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
import { useEffect, useRef, useState } from "react"

export function SheetCustom() {

  const [open, setOpen] = useState(false);
  const allMenu = [...menu, ...adminMenu];
  const path = usePathname();

  const pillRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<ReturnType<typeof animate> | null>(null);
 
  const lastYRef = useRef<number | null>(null);  
  
  const menuState = resolveTitle(path, allMenu);

  const activePosition = menuState?.position;
  
  useEffect(() => {
    // Si está cerrado o no hay posición válida, no hacemos nada
    if (!open || activePosition == null) return;

    // Usamos requestAnimationFrame para esperar a que SheetContent monte el pillRef en el DOM
    const frameId = requestAnimationFrame(() => {
      const pill = pillRef.current;
      if (!pill) return;

      animRef.current?.cancel();

      // Si es la primera vez O si el menú se acaba de abrir y la ruta es la misma que la última vez:
      // lo colocamos directo sin animación (duration: 0) en donde se había quedado.
      if (lastYRef.current == null || lastYRef.current === activePosition) {
        animate(pill, { y: activePosition, duration: 0 });
      } else {
        // Si cambió de ruta mientras estaba abierto, animamos hacia la nueva posición
        animRef.current = animate(pill, {
          y: activePosition,
          duration: 450,
          ease: 'outExpo',
        });
      }

      lastYRef.current = activePosition;
    });

    return () => {
      cancelAnimationFrame(frameId);
      animRef.current?.cancel();
    };
  }, [activePosition, open]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
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
          <span className="text-lg">{menuState?.name ?? ''}</span>
          <Link href={'/admin/shell'}>
            <Image src={'/favicon.ico'} alt="logo de rueda" width={30} height={30} />
          </Link>
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
                  <Link key={url} href={url} className={`z-10 m-2 flex flex-row gap-2 items-center transition-all duration-75 ${internalName === menuState?.name ? 'scale-[1.05]' : ''}`}>
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
                <Link key={url} href={url} className={`m-2 flex flex-row gap-2 items-center transition-all duration-75 ${internalName === menuState?.name ? 'scale-[1.05]' : ''}`}>                  
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
