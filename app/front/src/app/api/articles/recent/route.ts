import { HttpStatusCode } from '@/types/api'
import { Article } from '@/types/article'
import { apiFetcher } from '@/utils/apiFetcher'
import { getAPIBaseUrl, toCast } from '@/utils/general'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  _req: NextRequest,
) {
  const apiBaseURL = getAPIBaseUrl()
  const apiResponse = await apiFetcher({
    url: `${apiBaseURL}/articles/recent`
  })
  if (apiResponse.status !== 200){
    return NextResponse.json({message: 'INTERNAL_SERVER_ERROR'}, {status: HttpStatusCode.INTERNAL_SERVER_ERROR})
  }
  else {
    const articles = toCast<any, Article[]>(apiResponse.body.data.articles);
    return NextResponse.json({
      message: 'OK',
      articles: articles
    },
    {
      status: HttpStatusCode.OK
    })
  }
}