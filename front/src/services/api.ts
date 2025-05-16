
import { ApiFetcherConfig, ApiResponseBody } from "@/types/data"

export const apiFetcher = async( 
    rootUrl: string, 
    config: ApiFetcherConfig,
    data?: object
) => {
    let request_url = process.env["NEXT_PUBLIC_API_BASE_URL"];
    request_url += (`/${rootUrl}/`).replace("\/\/", "/");
    const request = new Request(
        `${request_url}`,
        {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            ...config
        }
    )
    const res = await fetch(request);
    const res_json = await res.json();

    console.log(res_json);
    return JSON.parse(JSON.stringify(res_json)) as ApiResponseBody;
}