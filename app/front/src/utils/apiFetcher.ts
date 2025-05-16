import { ApiRequestConfig, ApiResponse, HttpMethod, HttpStatusCode } from "@/types/api";


export type apiFetcherProps = {
  url: string;
  queryParams?: Record<string, string>;
  method?: HttpMethod;
  config?: ApiRequestConfig;
  data?: object;
}


export const apiFetcher = async (
  props: apiFetcherProps
): Promise<ApiResponse> => {
    const {
        url,
        queryParams,
        method = HttpMethod.GET,
        config = {
            cache: "no-store"
        },
        data,
    } = props;

    const params = new URLSearchParams(queryParams)
    let requestUrl = `${url}?${params.toString()}`;
    
    let request = new Request(
      `${requestUrl}`,
      {
        method: method,
        ...config
      }
    )
    switch (method) {
      case HttpMethod.GET:
        request = new Request(
          `${requestUrl}`,
          {
            method: method,
            ...config
          }
        )
        break
      case HttpMethod.POST:
        request = new Request(
          `${requestUrl}`,
          {
            method: method,
            body: JSON.stringify(data),
            ...config
          }
        )
        break
      case HttpMethod.PUT:
        request = new Request(
          `${requestUrl}`,
          {
            method: method,
            body: JSON.stringify(data),
            ...config
          }
        )
        break
      case HttpMethod.PATCH:
        request = new Request(
          `${requestUrl}`,
          {
            method: method,
            body: JSON.stringify(data),
            ...config
          }
        )
        break
      case HttpMethod.DELETE:
        request = new Request(
          `${requestUrl}`,
          {
            method: method,
            body: JSON.stringify(data),
            ...config
          }
        )
        break
      case HttpMethod.HEAD:
        request = new Request(
          `${requestUrl}`,
          {
            method: method,
            ...config
          }
        )
        break
      default:
        return {
          status: HttpStatusCode.BAD_REQUEST,
          body: {
            message: "BAD_REQUEST"
          }
        }
      }
      console.log(request)
      const res = await fetch(request)
      console.log(res)
      const jsonBody = await res.json()
      console.log(jsonBody)
      return {
        status: res.status,
        body: jsonBody
      }
}
