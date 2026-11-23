import { ProductFilters } from "@/interfaces/product-filters";

type RawSearchParams = Record<string, string | string[] | undefined>;

export const toOptionalNumber = (value: string): number | undefined => {
    if (value.trim() === '') return undefined;

    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : undefined;
};

export const parseProductFiltersFromSearchParams = (params: URLSearchParams): ProductFilters => ({
    search: params.get('search')?.trim() ?? '',
    brands: params.getAll('brands').map(value => value.trim()).filter(Boolean),
    models: params.getAll('models').map(value => value.trim()).filter(Boolean),
    years: params.getAll('years').map(Number).filter(Number.isFinite),
    minPrice: toOptionalNumber(params.get('minPrice') ?? ''),
    maxPrice: toOptionalNumber(params.get('maxPrice') ?? ''),
    minStock: toOptionalNumber(params.get('minStock') ?? ''),
    maxStock: toOptionalNumber(params.get('maxStock') ?? ''),
});

export const parseProductFilters = (params: RawSearchParams): ProductFilters => {
    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
        if (Array.isArray(value)) {
            value.forEach(item => searchParams.append(key, item));
        } else if (value !== undefined) {
            searchParams.append(key, value);
        }
    }

    return parseProductFiltersFromSearchParams(searchParams);
};

export const buildProductFilterParams = (filters: ProductFilters): URLSearchParams => {
    const params = new URLSearchParams();

    if (filters.search.trim() !== '') params.set('search', filters.search.trim());
    filters.brands.forEach(brand => params.append('brands', brand));
    filters.models.forEach(model => params.append('models', model));
    filters.years.forEach(year => params.append('years', String(year)));
    if (filters.minPrice !== undefined) params.set('minPrice', String(filters.minPrice));
    if (filters.maxPrice !== undefined) params.set('maxPrice', String(filters.maxPrice));
    if (filters.minStock !== undefined) params.set('minStock', String(filters.minStock));
    if (filters.maxStock !== undefined) params.set('maxStock', String(filters.maxStock));

    return params;
};

export const hasActiveFilters = (filters: ProductFilters): boolean =>
    filters.search.trim() !== '' ||
    filters.brands.length > 0 ||
    filters.models.length > 0 ||
    filters.years.length > 0 ||
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined ||
    filters.minStock !== undefined ||
    filters.maxStock !== undefined;
