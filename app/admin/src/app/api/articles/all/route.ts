import { ApiRequestConfig, HttpMethod, HttpStatusCode } from '@/types/api'
import { Article } from '@/types/article'
import { apiFetcher } from '@/utils/apiFetcher'
import auth0 from '@/utils/auth0'
import { getAPIBaseUrl, toCast } from '@/utils/general'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

export const GET = auth0.withApiAuthRequired(async(
  req: NextApiRequest,
  res: NextApiResponse
)=>{
  const token = await auth0.getAccessToken(req,res);
  if(!token.accessToken){
    return NextResponse.json({message: 'UNAUTHORIZED'}, {status: HttpStatusCode.UNAUTHORIZED})
  }

  const query = req.query || {};
  const { order_column, order_by, page, tag } = query;
  const queryOrderColumn = order_column as string || "created_at"
  const queryOrderBy = order_by as string || "DESC"
  const queryPage = page as string || "0"
  const queryTag = tag as string || undefined

  const config: ApiRequestConfig = {
    cache: "no-store",
    headers: {
      "Authorization": `Bearer ${token.accessToken}`,
      "Content-Type": "application/json",
    }
  }
  
  const apiBaseURL = getAPIBaseUrl()
  const apiResponse = await apiFetcher({
    url: `${apiBaseURL}/admin/articles/all`,
    queryParams: {
      "order_column": queryOrderColumn,
      "order_by": queryOrderBy,
      "page": queryPage,
      ...(queryTag && {"tag": queryTag}),
    },
    method: HttpMethod.GET,
    config: config
  })
  console.log(apiResponse)
  if (apiResponse.status !== 200){
    return NextResponse.json({message: 'INTERNAL_SERVER_ERROR'}, {status: HttpStatusCode.INTERNAL_SERVER_ERROR})
  }
  else {
    const articles = toCast<any, Article[]>(apiResponse.body.data.articles);
    return NextResponse.json({
      message: 'OK',
      articles: articles,
      page: apiResponse.body.data.page,
      total_page: apiResponse.body.data.total_page
    },
    {
      status: HttpStatusCode.OK
    })
  }
})
