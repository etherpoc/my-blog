
import { ApiFetcherConfig, ApiResponse, ApiResponseBody } from "@/types/data"

export const apiFetcher = async( 
    rootUrl: string, 
    config: ApiFetcherConfig,
    data?: object
): Promise<ApiResponse> => {
    console.log(data)
    let request_url = process.env["NEXT_PUBLIC_API_BASE_URL"];
    request_url += (`/${rootUrl}/`).replace("\/\/", "/");
    const request = new Request(
        `${request_url}`,
        {
            body: JSON.stringify(data),
            // body: data? JSON.parse(JSON.stringify(data)):undefined,
            ...config
        }
    )
    console.log(request.body);
    const response = await fetch(request);
    const responseJson = await response.json();

    console.log(response);
    console.log(responseJson);
    const result:ApiResponse = {
        status: response.status,
        body: JSON.parse(JSON.stringify(responseJson)) as ApiResponseBody,
    }
    return result
}
