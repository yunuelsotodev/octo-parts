export const slugConverter = (value : string) : string => {
    return value
        .trim()
        .toLocaleLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '');
}