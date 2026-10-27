import { AiFillProduct } from "react-icons/ai";
import { MdProductionQuantityLimits } from "react-icons/md";
import { BsCashStack } from "react-icons/bs";
import { MdShopTwo } from "react-icons/md";
import { Menu } from "@/interfaces/menu";
import { FaUserLarge } from "react-icons/fa6";
import { MdOutlineWeb } from "react-icons/md";
import { GrCatalog } from "react-icons/gr";

export const menu: Menu[] = [
    {
        'url': '/admin/products',
        'name': 'Productos',
        'icon': AiFillProduct,
        'position': 1,
    },
    {
        'url': '/admin/shell',
        'name': 'Venta',
        'icon': MdProductionQuantityLimits,
        'position': 48,
    },
    {
        'url': '/admin/statements',
        'name': 'Estados de cuenta',
        'icon': BsCashStack,
        'position': 96,
    },
    {
        'url': '/admin/purchase-orders',
        'name': 'Registro de compra',
        'icon': MdShopTwo
    },
    {
        'url': '/admin/catalogs',
        'name': 'Catalogos',
        'icon': GrCatalog
    }
];

export const adminMenu: Menu[] = [
    {
        'url': '/admin/users',
        'name': 'Usuarios',
        'icon': FaUserLarge
    },
    {
        'url': '/admin/',
        'name': 'Administrar web',
        'icon': MdOutlineWeb
    }
];