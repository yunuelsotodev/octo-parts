import { FaCloudDownloadAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { JSX } from "react/jsx-runtime";
import { MdPhotoCamera } from "react-icons/md";
import { FieldError } from "./field";
import { Field, UseFieldArrayRemove } from "react-hook-form";
import { Image } from "../../../generated/prisma/client";

interface NewImageField {
  fieldKey: string,
  id: string,
  file: File
} 

interface Props {
  inputFile: JSX.Element,
  capture?: JSX.Element,
  error: boolean,
  fields: NewImageField[],
  existFields?: Image[],
  removeImage: UseFieldArrayRemove,
  handleRemoveImage: (value: string) => void
}

export function CustomEmptyFile({ inputFile, capture, error, fields, removeImage, existFields = [], handleRemoveImage }: Props) {

  return (
    <Empty className={`border ${error ? 'border-solid border-red-500' : 'border-dashed'}`}>
      {fields?.length > 0 || existFields?.length > 0 ? (
          <div className="flex flex-wrap gap-2">
              {fields?.map((item, index) => (
                  <div key={item.id} className="relative">
                      <img src={URL.createObjectURL(item.file)} alt={`Nueva imagen ${index + 1}`} className="h-20 w-20 rounded-md object-cover" />
                      <button type="button" onClick={() => removeImage(index)} className="absolute top-0 right-0 rounded-full bg-black/60 px-1 text-xs text-white">
                          x
                      </button>                      
                  </div>
              ))}
              {existFields.map((item, index) => (
                <div key={item.id} className="relative">
                    <img src={item.url} alt={`Nueva imagen ${index + 1}`} className="h-20 w-20 rounded-md object-cover" />
                    <button type="button" onClick={() => handleRemoveImage(item.id)} className="absolute top-0 right-0 rounded-full bg-black/60 px-1 text-xs text-white">
                        x
                    </button>                      
                </div>
              ))}
          </div>
      ) : (
        <EmptyHeader className={`${error ? 'text-red-500' : ''}`}>
          <EmptyMedia variant="icon">
            <FaCloudDownloadAlt />
          </EmptyMedia>
          <EmptyTitle>No hay imagen</EmptyTitle>
          <EmptyDescription className={`${error ? 'text-red-500' : ''}`}>
            Sube la imagen de referencia para el producto.
          </EmptyDescription>        
        </EmptyHeader>          
      )}
      <EmptyContent className="relative">
        {inputFile}
        <Button variant="outline">
          Subir Imagenes
        </Button>
        {capture ? (
          <div>
            {capture}
            <Button variant='default'>
              <MdPhotoCamera/> Tomar foto
            </Button>
          </div>
        ) : ('')}
      </EmptyContent>
    </Empty>
  )
}
