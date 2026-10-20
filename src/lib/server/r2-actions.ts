import { Bucket$, DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '../zodSchemas/product/zodSchemaProduct';
import { r2Client } from '@/utils/r2-utils';
import { APIResponse } from '@/interfaces/apiResponse';

export const submitImageR2 = async (data: {id: string, file: File}[]): Promise<ResponseImages> => {
    if (!data || data.length === 0) {
        return {
            status: 500,
            message: 'No se encontro ninguna imagen',            
        }
    }

    const MAX_SIZE = MAX_FILE_SIZE;
    let count = 0;
    const fileDataResponse: ResponseImage[] = [];

    for (const image of data) {
        if (!(image.file instanceof File)) {
            fileDataResponse[count] = {
                status: 500,
                message: 'No es valido el tipo del archivo se intento subir'
            }
        }

        if (!image.file.type.startsWith('image/')) { 
            fileDataResponse[count] = {
                status: 500,
                message: 'El archivo no es valido, solo se aceptan imagenes'
            }
        }

        if (image.file.size > MAX_SIZE) {
            fileDataResponse[count] = {
                status: 500,
                message: 'El peso de la imagen es demaciado, solo se acepta un peso de ' + MAX_SIZE + 'MB',
            }
        }

        if (!ACCEPTED_IMAGE_TYPES.includes(image.file.type)) {
            fileDataResponse[count] = { 
                status: 500,
                message: 'El tipo de imagen no es valido, solo se acetan: ' + ACCEPTED_IMAGE_TYPES.join(', '),
            } 
        }

        try {
            const bytes = await image.file.arrayBuffer();
            const extension = await image.file.type;
            const buffer = Buffer.from(bytes);

            const cleanName = image.file.name.replace(/\s+/g, '_').normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            const filename = `${image.id}-${cleanName}`;

            const uploadCommand = new PutObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME,
                Key: filename,
                Body: buffer,
                ContentType: image.file.type
            });

            await r2Client.send(uploadCommand);

            fileDataResponse[count] = {
                status: 200,
                message: 'Archivo salvado',
                extension: extension,
                shortName: cleanName,
                fullName: filename,
                url: `${process.env.R2_PUBLIC_URL}/${filename}`,                
                id: image.id
            }

        } catch (e) {
            fileDataResponse[count] = {
                status: 200,
                message: 'Archivo salvado',                        
            }

            continue;
        }

        count++
    }

    return {
        status: 200,
        message: 'Archivos guardados',
        images: fileDataResponse
    }
}

export const deleteImageR2 = async (name: string): Promise<APIResponse> => {
    if (!name) return { status: 500, message: 'Nombre vacio' }

    try {
        const deleteCommand = new DeleteObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: name
        });

        await r2Client.send(deleteCommand);
    } catch (e) {
        return {
            status: 500,
            message: 'Error al eliminar la imagen del servidor'
        }
    }

    return {
        status: 200,
        message: 'Imagen eliminada con exito'
    }
} 