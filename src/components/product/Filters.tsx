'use client'
import { Field } from '../ui/field'
import { Option } from '@/interfaces/option';
import { Brand, Model } from '../../../generated/prisma/client';
import { ComboboxMultiple } from '../ui/ComboboxMultiple';
import { Button } from '../ui/button';
import { MdFilterAltOff } from 'react-icons/md';
import SearchInput from '../ui/SearchInput';
import { ProductFilters } from '@/interfaces/product-filters';
import { toOptionalNumber } from '@/utils/product-filters';
import { DebouncedInput } from '../ui/DebouncedInput';

interface Props {
    years: Option[],
    models: Model[],
    brands: Brand[],
    filters: ProductFilters,
    onFiltersChange: (patch: Partial<ProductFilters>) => void,
    onClear: () => void,
}

export default function Filters({ years, models, brands, filters, onFiltersChange, onClear }: Props) {
    const modelList = models.map(model => {
        return {
            label: model.name,
            value: model.name
        }
    });

    const brandList = brands.map(brand => {
        return {
            value: brand.name,
            label: brand.name
        }
    });

    return (
        <div className='flex flex-col gap-4 mb-5 px-2'>
            <div className='flex flex-row gap-2 justify-between'>
                <Field>
                    <ComboboxMultiple
                        options={brandList}
                        emptyValue='No hay marca'
                        placeholder='Por marca'
                        selected={filters.brands}
                        handleChange={(value) => onFiltersChange({ brands: value })}
                        name="brands"
                    />
                </Field>
            </div>
            <div className='flex flex-row gap-2 justify-between'>
                <Field>
                    <ComboboxMultiple
                        options={modelList}
                        emptyValue='No hay modelo'
                        placeholder='Por modelo'
                        selected={filters.models}
                        handleChange={(value) => onFiltersChange({ models: value })}
                        name="models"
                    />
                </Field>
            </div>
            <div className='flex flex-row gap-2 justify-between'>
                <Field>
                    <ComboboxMultiple
                        options={years}
                        emptyValue='No hay año'
                        placeholder='Por año'
                        selected={filters.years.map(year => `${year}`)}
                        handleChange={(value) => onFiltersChange({
                            years: value.map(year => Number(year)).filter(Number.isFinite)
                        })}
                        name="years"
                    />
                </Field>
            </div>
            <div className='flex flex-row gap-2 justify-between'>
                <Field>
                    <DebouncedInput
                        type='number'
                        placeholder='Precio mayor a'
                        value={filters.minPrice !== undefined ? `${filters.minPrice}` : ''}
                        onValueChange={(value) => onFiltersChange({ minPrice: toOptionalNumber(value) })}
                    />
                </Field>
                <Field>
                    <DebouncedInput
                        type="number"
                        placeholder='Precio menor a'
                        value={filters.maxPrice !== undefined ? `${filters.maxPrice}` : ''}
                        onValueChange={(value) => onFiltersChange({ maxPrice: toOptionalNumber(value) })}
                    />
                </Field>
            </div>
            <div className="flex flex-row gap-2 justify-between">
                <Field>
                    <DebouncedInput
                        type="number"
                        placeholder="Cantidad en stock mayor a"
                        value={filters.minStock !== undefined ? `${filters.minStock}` : ''}
                        onValueChange={(value) => onFiltersChange({ minStock: toOptionalNumber(value) })}
                    />
                </Field>
                <Field>
                    <DebouncedInput
                        type="number"
                        placeholder="Cantidad en stock menor a"
                        value={filters.maxStock !== undefined ? `${filters.maxStock}` : ''}
                        onValueChange={(value) => onFiltersChange({ maxStock: toOptionalNumber(value) })}
                    />
                </Field>
            </div>
            <SearchInput
                placeholder='Buscar producto'
                searchFunction={(value) => onFiltersChange({ search: value })}
                animate={false}
                value={filters.search}
            />
            <Field>
                <Button type="button" onClick={onClear}>
                    <MdFilterAltOff size={30}/>
                    Eliminar filtros
                </Button>
            </Field>
        </div>
    )
}
