import { Menu } from "@/interfaces/menu";

export const resolveTitle = (pathname: string, allMenu: Menu[]): Menu|null => {
    const menu = allMenu.find(menu => `${menu.url}` == pathname);
    return menu ?? null;
}