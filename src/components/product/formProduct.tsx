import { getYears } from "@/utils/years"
import { Product } from "../../../generated/prisma/client"
import { CustomSelect } from "../ui/customSelect"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "../ui/input-group"
import { CustomCombobox } from "../ui/customCombobox"
import { getModels } from "@/utils/models"
import { getBrands } from "@/utils/brands"
import { Button } from "../ui/button"
import { CustomEmptyFile } from "../ui/customEmptyFile"

interface Props {
    product?: Product
}

export default function FormProduct({ product }: Props) {
    const years = getYears();
    const models = getModels();
    const brands = getBrands();

    return (
        <form>
            <div className="-mx-4 mb-0 no-scrollbar max-h-[60vh] overflow-y-auto px-4">
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="name">Nombre</FieldLabel>
                        <Input
                            id="name"
                            placeholder="Ejem: Chasis"                        
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="brand">Marca</FieldLabel>
                        <CustomCombobox list={brands}/>
                    </Field>
                    <div className="grid grid-cols-2 gap-2">
                        <Field>
                            <FieldLabel htmlFor="model">Modelo</FieldLabel>
                            <CustomCombobox list={models}/>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="year">Año</FieldLabel>
                            <CustomSelect options={years} title="Año" />
                        </Field>
                    </div>                
                    <Field>
                        <FieldLabel htmlFor="description">Descripción</FieldLabel>
                        <InputGroup>
                            <InputGroupTextarea
                                id="description"
                                placeholder="Ejem: Chasis de Tsuru color gris"
                            />
                            <InputGroupAddon align="block-end">
                                <InputGroupText>0/250</InputGroupText>                            
                            </InputGroupAddon>
                        </InputGroup>
                        <FieldDescription>
                            En este apartado puede ingresar caracteristicas fisicas
                        </FieldDescription>
                    </Field>  
                    <div className="grid grid-cols-2 gap-2">
                        <Field>
                            <FieldLabel htmlFor="price">Precio de venta</FieldLabel>
                            <Input
                                type="number"
                                step={0.01}
                                id="price"
                                placeholder="0.0"
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="amount">Cantidad</FieldLabel>
                            <Input
                                type="number"
                                step={0}
                                id="amount"
                                placeholder=""
                            />
                        </Field>
                    </div>
                    <Field>
                        <FieldLabel htmlFor="code">Numero de parte</FieldLabel>
                        <Input
                            id="code"
                            placeholder=""
                        />
                    </Field>
                    <CustomEmptyFile/>
                </FieldGroup>
                <Button type="submit" className={'w-full mt-4 sticky bottom-0'}>Guardar producto</Button>
            </div>
        </form>
    )
}
