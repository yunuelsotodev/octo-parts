'use client'
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group";
import { productSchema, ProductSchemaType } from "@/lib/zodSchemas/product/zodSchemaProduct";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useState } from "react";
import { toast } from "sonner";
import { nanoid } from "nanoid";
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { CustomEmptyFile } from "@/components/ui/customEmptyFile"
import { Button } from "@/components/ui/button"
import { CustomCombobox } from "@/components/ui/customCombobox"
import { Input } from "@/components/ui/input"
import { CustomSelect } from "@/components/ui/customSelect"
import { Brand, Image, Model, Product } from "../../../../../generated/prisma/client";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Option } from "@/interfaces/option";
import { createProduct } from "../actions";

interface Props {
  product?: Product & {
    images: Image[]
  },
  models: Model[],
  brands: Array<Brand & {models: Model[]}>,
  years: Option[],
  onSuccess?: () => void,
}

export default function BodyFormProduct({ models, brands, product, years, onSuccess }: Props) {
  
  const modelList = models.map(model => {
    return {
      label: model.name,
      value: model.name
    }
  });

  const [modelListState, setModelListState] = useState(modelList);

  const brandList = brands.map(brand => {
    return {
      value: brand.name,
      label: brand.name
    }
  });

  const [existImages, setExistImages] = useState(product?.images || []);

  const handleModel = (brandName: string|null) => {
    const brand = brands.find(brand => brand.name === brandName);
    const models = brand?.models;
    if (models) {
      setModelListState(models.map(model => ({ label: model.name, value: model.name })));      
    }
  }

  const { register, control, handleSubmit, setValue, getValues, formState: { errors } } = useForm<ProductSchemaType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      brand: product?.brand ?? '',
      code: product?.code ?? '',
      description: product?.description ?? '',
      model: product?.model ?? '',
      name: product?.name ?? '',
      price: product?.price ?? 0,
      stock: product?.stock ?? 0,
      year: product?.year ?? undefined,
      images: [],
      imageRemoves: [],
    }
  });

  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
    control,
    name: 'images',
    keyName: 'fieldKey',
  });

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    Array.from(list).forEach((file) => appendImage({ id: nanoid(), file }));
  };

  const handleRemoveImage = (imageId: string) => {
    setExistImages((prev) => prev.filter((img) => img.id !== imageId));

    const currentRemoves = getValues('imageRemoves') || [];
    setValue('imageRemoves', [...currentRemoves, { id: imageId }]);
  }

  const onSubmit = (values: ProductSchemaType) => {
    startTransition(async () => {
      try {
        const response = await createProduct(values);

        if (response.status != 200) {
          toast.error(response.message, { position: 'bottom-right', richColors: true })
          return;
        }

        toast.success(response.message, { position: 'bottom-right', richColors: true});
        onSuccess?.();
        console.log(values);
      } catch (e) {
        toast.error('Ocurrio un error en el servidor, favor de intentar más tarde.', { position: 'bottom-right', richColors: false });
        console.error(e);
      }
    });
  }  

  return (
    <form onSubmit={handleSubmit(onSubmit)} method="POST">
      <div className="-mx-4 mb-0 no-scrollbar max-h-[60vh] overflow-y-auto px-4">
        <FieldGroup>
          <CustomEmptyFile
            handleRemoveImage={handleRemoveImage}
            removeImage={removeImage}
            fields={imageFields}
            existFields={existImages}
            error={!!errors.images}
            inputFile={
              <input
                type="file"
                multiple
                accept="image/*"
                className="absolute opacity-0 w-30 h-8 cursor-pointer"
                onChange={(e) => { addFiles(e.target.files); e.target.value = ''; }}
              />
            }
            capture={
              <input
                type="file"
                accept="image/*"
                className="absolute opacity-0 w-30 h-8 cursor-pointer"
                capture="environment"
                onChange={(e) => { addFiles(e.target.files); e.target.value = ''; }}
              />
            }
          />
          {
            typeof errors.images?.message === 'string' && (
              <FieldError>
                *{errors.images.message}
              </FieldError>
            )
          }

          <Field data-invalid={errors?.name && true}>
            <FieldLabel htmlFor="name">Nombre</FieldLabel>
            <Input
              id="name"
              placeholder="Ejem: Chasis"
              {...register('name')}
              aria-invalid={errors?.name && true}
            />
            {
              errors?.name && (
                <FieldError>
                  *{errors.name.message}
                </FieldError>
              )
            }
          </Field>
          <Controller
            name="brand"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="brand">Marca</FieldLabel>
                <CustomCombobox
                  list={brandList}
                  value={field.value}
                  onChange={field.onChange}
                  invalid={fieldState.invalid}
                  functionChange={handleModel}
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
          <div className="grid grid-cols-2 gap-2">
            <Controller
              name="model"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="model">Modelo</FieldLabel>
                  <CustomCombobox
                    list={modelListState}
                    value={field.value}
                    onChange={field.onChange}
                    invalid={fieldState.invalid}
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
            <Controller
              name="year"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.error && true}>
                  <FieldLabel htmlFor="year">Año</FieldLabel>
                  <CustomSelect
                    options={years}
                    title="Año"
                    value={field.value == null ? '' : `${field.value}`}
                    onChange={(selectedValue) => {
                      if (!selectedValue) {
                        field.onChange(undefined);
                        return;
                      }

                      field.onChange(parseInt(selectedValue, 10));
                    }}
                    invalid={fieldState.invalid}
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
          </div>
          <Field data-invalid={errors?.description && true}>
            <FieldLabel htmlFor="description">Descripción</FieldLabel>
            <InputGroup>
              <InputGroupTextarea
                id="description"
                placeholder="Ejem: Chasis de Tsuru color gris"
                {...register('description')}
                aria-invalid={errors?.description && true}
              />
              <InputGroupAddon align="block-end">
                <InputGroupText>0/250</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            {
              errors?.description && (
                <FieldError>*{errors?.description.message}</FieldError>
              )
            }
            <FieldDescription>
              En este apartado puede ingresar caracteristicas fisicas
            </FieldDescription>
          </Field>
          <div className="grid grid-cols-2 gap-2">
            <Field data-invalid={errors?.price && true}>
              <FieldLabel htmlFor="price">Precio de venta</FieldLabel>
              <Input
                type="number"
                step={0.01}
                id="price"
                placeholder="0.0"
                {...register('price', { valueAsNumber: true })}
                aria-invalid={errors?.price && true}
              />
              {
                errors?.price && (
                  <FieldError>*{errors?.price.message}</FieldError>
                )
              }
            </Field>
            <Field data-invalid={errors?.stock && true}>
              <FieldLabel htmlFor="stock">Cantidad</FieldLabel>
              <Input
                type="number"
                step={0}
                id="stock"
                placeholder="0"
                {...register('stock', { valueAsNumber: true })}
                aria-invalid={errors?.stock && true}
              />
              {
                errors?.stock && (
                  <FieldError>*{errors?.stock.message}</FieldError>
                )
              }
            </Field>
          </div>
          <Field data-invalid={errors?.code && true}>
            <FieldLabel htmlFor="code">Numero de parte</FieldLabel>
            <Input
              id="code"
              placeholder=""
              {...register('code')}
              aria-invalid={errors?.code && true}
            />
            {
              errors?.code && (
                <FieldError>*{errors?.code.message}</FieldError>
              )
            }
          </Field>
        </FieldGroup>
        <Button type="submit" className={'w-full mt-4 sticky bottom-0'}>Guardar producto</Button>
      </div>
    </form>
  )
}
