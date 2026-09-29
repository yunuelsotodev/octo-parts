import {
  Menubar,
  MenubarMenu,
} from "@/components/ui/menubar"
import Image from "next/image"
import { IoIosMenu } from "react-icons/io"

export function MenuBarCustom() {
  return (
    <Menubar className="w-full rounded-none h-12 justify-between">
      <MenubarMenu>
        <IoIosMenu size={30}/>        
      </MenubarMenu>
      <MenubarMenu>     
        <Image src={'/favicon.ico'} alt="logo de rueda" width={30} height={30} />           
      </MenubarMenu>            
    </Menubar>
  )
}
