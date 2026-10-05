import { Menu } from "@/interfaces/menu";

export const resolveTitle = (pathname: string, allMenu: Menu[]): string => {
    console.log(pathname);
    const menu = allMenu.find(menu => `/${menu.url}` == pathname);

    return menu?.name ?? '';
}