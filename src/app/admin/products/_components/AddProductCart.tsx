import { Controller, useForm } from "react-hook-form"
import { Product } from "../../../../../generated/prisma/browser"
import { productToCartSchema, ProductToCartType } from "@/lib/zodSchemas/Shell/zodSchemaProductToCart"
import { zodResolver } from "@hookform/resolvers/zod";
import { Cart, Image as image } from "../../../../../generated/prisma/client";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CustomCombobox } from "@/components/ui/customCombobox";
import { Option } from "@/interfaces/option";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { success } from "zod";
import Image from "next/image";

interface Props {
    product: Product & {images: image[]} | null,
    carts: Cart[]
}

export default function AddProductCart({ product, carts }: Props) {

    const lastCart = [...carts].sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())[0];

    const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProductToCartType>({
        resolver: zodResolver(productToCartSchema),
        defaultValues: {
            cartname: lastCart?.name ?? 'Nuevo carrito',
            amount: 1
        }
    });

    const onSubmit = () => {

    }

    const list: Option[] = carts?.map(cart => {
        return {
            label: cart?.name ?? '',
            value: cart?.name ?? ''
        }
    }) ?? [{
        label: 'Nuevo carrito',
        value: 'Nuevo carrito'
    }];
    

    return (
        <form className="flex flex-col p-2 pb-20 gap-4" onSubmit={handleSubmit(onSubmit)}>
            {
                product && (
                    <>
                        <div>
                            <Image src={product?.images[0].url} alt={product?.name} />
                        </div>
                        <Controller
                            name="cartname"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="cartname">Nombre del carrito</FieldLabel>
                                    <CustomCombobox
                                        list={list}
                                        value={field.value}
                                        onChange={field.onChange}
                                        invalid={fieldState.invalid}
                                        placeholder="Nombre"
                                        allowCustomValue
                                    />
                                    {
                                        fieldState.error && (
                                            <FieldError>
                                                *{fieldState.error.message}
                                            </FieldError>
                                        )
                                    }
                                </Field>
                            )}
                        />
                        <Field data-invalid={errors?.amount && true} className="flex flex-row gap-2">
                            <Button variant={'default'} className="flex-1">-</Button>
                            <Input
                                type="number"
                                id="amount"
                                {...register('amount', {valueAsNumber: true})}                    
                                aria-invalid={errors?.amount && true}
                                className="flex-3 text-center"
                            />
                            <Button variant={'default'} className="flex-1">+</Button>
                        </Field>
                        {
                            errors?.amount && (
                                <FieldError>
                                    *{errors.amount.message}
                                </FieldError>
                            )
                        }
                        <Button type="submit" variant={'success'} disabled={isSubmitting}>
                            {
                                isSubmitting ? (
                                    <>
                                        <Spinner />
                                        Agregar articulo
                                    </>
                                ) : (
                                    <>
                                        Agregar articulo
                                    </>
                                )
                            }
                        </Button>
                    </>
                )
            }
        </form>
    )
}
