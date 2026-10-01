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
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { resolveTitle } from "@/lib/site"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { IoIosMenu } from "react-icons/io"

export function SheetCustom() {

  const path = usePathname();
  const name = resolveTitle(path);

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
            <span>{name}</span>
          <Image src={'/favicon.ico'} alt="logo de rueda" width={30} height={30} />
        </MenubarMenu>
      </Menubar>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Name</Label>
            <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Username</Label>
            <Input id="sheet-demo-username" defaultValue="@peduarte" />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose render={<Button variant="outline">Close</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
