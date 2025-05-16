import { HttpStatusCode } from '@/types/api'
import { Article } from '@/types/article'
import { apiFetcher } from '@/utils/apiFetcher'
import { getAPIBaseUrl, toCast } from '@/utils/general'
import { NextRequest, NextResponse } from 'next/server'

type QueryParams = {
  orderColumn: string;
  orderBy: string;
  page: string;
  tag?: string;
}

export async function GET(
  req: NextRequest,
) {
  const apiBaseURL = getAPIBaseUrl()
  const queryParams: QueryParams = {
    orderColumn: req.nextUrl.searchParams.get('order_column') || "created_at",
    orderBy: req.nextUrl.searchParams.get('order_by') || "DESC",
    page: req.nextUrl.searchParams.get('page') || "0",
    tag: req.nextUrl.searchParams.get('tag') || undefined,
  }
  
  const apiResponse = await apiFetcher({
    url: `${apiBaseURL}/articles/all`,
    queryParams: {
      "order_column": queryParams.orderColumn,
      "order_by": queryParams.orderBy,
      "page": queryParams.page,
      ...(queryParams.tag && {"tag": queryParams.tag}),
    }
  });

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
}
