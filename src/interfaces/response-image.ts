interface ResponseImage {
    status: 200 | 500,
    message: string,
    extension?: string,
    shortName?: string,
    fullName?: string,
    url?: string,
    id?: string
}

interface ResponseImages {
    status: 200 | 500,
    message: string,
    images?: Array<ResponseImage>
}