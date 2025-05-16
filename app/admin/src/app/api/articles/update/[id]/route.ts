import { ApiRequestConfig, HttpMethod, HttpStatusCode } from '@/types/api'
import { apiFetcher } from '@/utils/apiFetcher'
import auth0 from '@/utils/auth0'
import { getAPIBaseUrl } from '@/utils/general'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

export const PATCH = auth0.withApiAuthRequired(async(
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
    const parsedId = parseInt(id);
    const data = await new Response(req.body).json();
    const formData = {
      title: data.title,
      img_url: data.img_url,
      tags: data.tags,
      visibility: data.visibility,
      content: data.content,
    }
    const apiBaseURL = getAPIBaseUrl()
    const apiResponse = await apiFetcher({
      url: `${apiBaseURL}/admin/articles/update/${parsedId}`,
      method: HttpMethod.PATCH,
      config: config,
      data: formData
    })
    if (apiResponse.status !== 200){
      return NextResponse.json({message: 'INTERNAL_SERVER_ERROR'}, {status: HttpStatusCode.INTERNAL_SERVER_ERROR})
    }
    else {
      console.log("conplete")
      return NextResponse.json({
        message: 'Update Completed',
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
