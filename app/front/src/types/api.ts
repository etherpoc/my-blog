// HTTPメソッド
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  HEAD = 'HEAD',
}

// HTTPステータスコード
export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500
}

// APIリクエストコンフィグ
export type ApiRequestConfig = {
  next?: { revalidate: number }
  [key: string]: any
}

// APIレスポンスタイプ
export type ApiResponse = {
  status: number
  body: any
}

// APIエラータイプ
export type ApiErrorResponse = {
  status: number
  message: string
}