import { IconType } from "react-icons/lib"
import { AiFillProduct } from "react-icons/ai";
import { MdProductionQuantityLimits } from "react-icons/md";
import { BsCashStack } from "react-icons/bs";
import { MdShopTwo } from "react-icons/md";
import { Menu } from "@/interfaces/menu";
import { FaUserLarge } from "react-icons/fa6";
import { MdOutlineWeb } from "react-icons/md";

export const menu: Menu[] = [
    {
        'url': 'admin/products',
        'name': 'Productos',
        'icon': AiFillProduct
    },
    {
        'url': 'admin/shell',
        'name': 'Venta',
        'icon': MdProductionQuantityLimits,
    },
    {
        'url': 'admin/statements',
        'name': 'Estados de cuenta',
        'icon': BsCashStack
    },
    {
        'url': 'admin/purchase-orders',
        'name': 'Registro de compra',
        'icon': MdShopTwo
    }
];

export const adminMenu: Menu[] = [
    {
        'url': 'admin/users',
        'name': 'Usuarios',
        'icon': FaUserLarge
    },
    {
        'url': 'admin/',
        'name': 'Administrar web',
        'icon': MdOutlineWeb
    }
];