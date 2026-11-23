export interface ProductFilters {
    search: string;
    brands: string[];
    models: string[];
    years: number[];
    minPrice?: number;
    maxPrice?: number;
    minStock?: number;
    maxStock?: number;
}
