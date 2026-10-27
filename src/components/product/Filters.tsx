import { Field } from '../ui/field'
import { Option } from '@/interfaces/option';
import { Brand, Model } from '../../../generated/prisma/client';
import { Input } from '../ui/input';
import { ComboboxMultiple } from '../ui/ComboboxMultiple';
import { Button } from '../ui/button';
import { MdFilterAltOff } from 'react-icons/md';
import SearchInput from '../ui/SearchInput';


interface Filters {
    name: string,
    value: string
}

interface Props {
    years: Option[],
    models: Model[],
    brands: Brand[],
    handleFilters: (value: string[], name: string) => Promise<void>
    brandsF: string[],
    modelsF: string[],
    yearsF: number[],
    restFilters: Filters[]
}

export default function Filters({ years, models, brands, handleFilters, brandsF, modelsF, yearsF, restFilters }: Props) {
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

    //TODO: Completar los value de los inputs para que se basen en al resto de estados.

    return (
        <div className='flex flex-col gap-4 mb-5 px-2'>
            <div className='flex flex-row gap-2 justify-between'>
                <Field>
                    <ComboboxMultiple
                        options={brandList}                        
                        emptyValue='No hay marca'
                        placeholder='Por marca'
                        selected={brandsF}
                        handleChange={handleFilters}
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
                        selected={modelsF}
                        handleChange={handleFilters}
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
                        selected={yearsF.map(v => `${v}`)}
                        handleChange={handleFilters}
                        name="years"
                    />
                </Field>    
            </div>
            <div className='flex flex-row gap-2 justify-between'>
                <Field>
                    <Input
                        type='number'
                        placeholder='Precio mayor a'
                        onChange={(e) => handleFilters([e.target.value], 'priceL')}
                    />
                </Field>
                <Field>
                    <Input
                        type="number"
                        placeholder='Precio menor a'
                        onChange={(e) => handleFilters([e.target.value], 'priceM')}
                    />
                </Field>
            </div>
            <div className="flex flex-row gap-2 justify-between">
                <Field>
                    <Input
                        type="number"
                        placeholder="Cantidad en stock mayor a"
                        onChange={(e) => handleFilters([e.target.value], 'stockL')}
                    />
                </Field>
                <Field>
                    <Input
                        type="number"
                        placeholder="Cantidad en stock menor a"
                        onChange={(e) => handleFilters([e.target.value], 'stockM')}                        
                    />
                </Field>
            </div>
            <SearchInput
                placeholder='Buscar producto'
                searchFunction={(value) => handleFilters([value], 'search')}
                animate={false}
                value={restFilters.find(filter => filter.name === 'search')!.value}
            />
            <Field>
                <Button type="button" onClick={() => handleFilters([], 'clear')}>
                    <MdFilterAltOff size={30}/>
                    Eliminar filtros
                </Button>
            </Field>
        </div>
    )
}
