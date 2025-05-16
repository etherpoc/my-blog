
export interface ApiFetcherConfig {
    method: string,
    next?: { revalidate: number }
    [key: string]: any
}

export interface ApiResponse {
    status: number
    body: ApiResponseBody
}
export interface ApiResponseBody {
    message: string
    data: any
}

export interface ArticleData {
    id: number
    title: string
    img_url: string
    tags: Array<string>
    content: string
    visibility: boolean
    created_at: string
    updated_at: string
    pv: number
}


type orderType = "id" | "title" | "pv";
type reverseType = "asc" | "desc"