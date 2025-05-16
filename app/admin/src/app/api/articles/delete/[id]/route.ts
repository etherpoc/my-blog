import { ApiRequestConfig, HttpMethod, HttpStatusCode } from '@/types/api'
import { apiFetcher } from '@/utils/apiFetcher'
import auth0 from '@/utils/auth0'
import { getAPIBaseUrl } from '@/utils/general'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

export const DELETE = auth0.withApiAuthRequired(async(
  req: NextApiRequest,
  res: NextApiResponse,
)=>{
  const token = await auth0.getAccessToken(req,res);
  if(!token.accessToken){
    return NextResponse.json({message: 'UNAUTHORIZED'}, {status: HttpStatusCode.UNAUTHORIZED})
  }

  const config: ApiRequestConfig = {
    cache: "no-store",
    headers: {
      "Authorization": `Bearer ${token.accessToken}`,
      "Content-Type": "application/json",
    }
  }
  
  try {
    const { id } = Object(res).params;
    const parsedId = parseInt(id)
    const apiBaseURL = getAPIBaseUrl()
    const apiResponse = await apiFetcher({
      url: `${apiBaseURL}/admin/articles/delete/${parsedId}`,
      method: HttpMethod.DELETE,
      config: config
    })
    if (apiResponse.status !== 200){
      return NextResponse.json({message: 'INTERNAL_SERVER_ERROR'}, {status: HttpStatusCode.INTERNAL_SERVER_ERROR})
    }
    else {
      return NextResponse.json({
        message: 'Delete Completed',
      },
      {
        status: HttpStatusCode.OK
      })
    }
  }
  catch (e){
    console.log(e)
    return NextResponse.json({message: 'INTERNAL_SERVER_ERROR'}, {status: HttpStatusCode.INTERNAL_SERVER_ERROR})
  }
})
