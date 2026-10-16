export interface APIResponse {
    status: 200 | 500,
    message: string,
    data?: Array<any>
}