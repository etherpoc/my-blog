import { HttpStatusCode } from '@/types/api'
import { Article } from '@/types/article'
import { apiFetcher } from '@/utils/apiFetcher'
import { getAPIBaseUrl, toCast } from '@/utils/general'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  _req: NextRequest,
  { params }: { params: {id: string} },
) {
  const apiBaseURL = getAPIBaseUrl()
  const parsedId = parseInt(params.id)
  const apiResponse = await apiFetcher({
    url: `${apiBaseURL}/articles/detail/${parsedId}`,
  })
  if (apiResponse.status !== 200){
    return NextResponse.json({message: 'INTERNAL_SERVER_ERROR'}, {status: HttpStatusCode.INTERNAL_SERVER_ERROR})
  }
  else {
    const article = toCast<any, Article>(apiResponse.body.data.article)
    return NextResponse.json({
      message: 'OK',
      article: article
    },
    {
      status: HttpStatusCode.OK
    })
  }
}