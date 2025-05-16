import { ApiRequestConfig, HttpMethod, HttpStatusCode } from '@/types/api'
import { Article } from '@/types/article'
import { apiFetcher } from '@/utils/apiFetcher'
import auth0 from '@/utils/auth0'
import { getAPIBaseUrl, toCast } from '@/utils/general'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

// export const GET = (req: any, res:any) => {
//   console.log(req,res.params.id)
//   return NextResponse.json({message: 'UNAUTHORIZED'}, {status: HttpStatusCode.UNAUTHORIZED})

// }

export const GET = auth0.withApiAuthRequired(async(
  req: NextApiRequest,
  res: NextApiResponse,
)=>{
  console.log(req.url)
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
      url: `${apiBaseURL}/admin/articles/detail/${parsedId}`,
      method: HttpMethod.GET,
      config: config
    })
    if (apiResponse.status !== 200){
      return NextResponse.json({message: 'INTERNAL_SERVER_ERROR'}, {status: HttpStatusCode.INTERNAL_SERVER_ERROR})
    }
    else {
      const article = toCast<any, Article>(apiResponse.body.data.article)
      console.log(article)
      return NextResponse.json({
        message: 'OK',
        article: article
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
