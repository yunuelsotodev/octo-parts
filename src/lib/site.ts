const pageNames: Record<string, string> = {
    'admin': 'Panel',
    'admin/products': 'Productos'
}

export const resolveTitle = (pathname: string) : string => {
    const key = pathname.replace(/^\//, '').replace(/\/$/, '');
    if (pageNames[key]) return pageNames[key];

    if (key.startsWith('admin/products/')) return 'Detalle de producto';

    return key.split('/').pop()?.replace(/-/g, ' ') ?? '';
}