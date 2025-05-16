"use client"
import { ApiRequestConfig, HttpMethod } from "@/types/api";
import { apiFetcher } from "@/utils/apiFetcher";
import styles from "./styles.module.scss"
import PageTitle from "@/components/ui/PageTitle";
import ArticleTable from "@/components/article/ArticleTable";
import { getBaseUrl, toCast } from "@/utils/general";
import { Article } from "@/types/article";
import ContentTitle from "@/components/ui/ContentTitle";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Paging from "@/components/ui/Paging";


type QueryParams = {
  orderColumn: string;
  orderBy: string;
  page: string;
  tag?: string;
}

async function getData(queryParams: QueryParams) {
  const baseUrl = getBaseUrl()

  const url = `${baseUrl}/api/articles/all`
  const config: ApiRequestConfig = {
    cache: "no-store"
  }
  const res = await apiFetcher({
    url: url,
    queryParams: {
      "order_column": queryParams.orderColumn,
      "order_by": queryParams.orderBy,
      "page": queryParams.page,
      ...(queryParams.tag && {"tag": queryParams.tag}),
    },
    method: HttpMethod.GET,
    config: config
  });
  return res
}

export default function ArticlesPage() {
  const [ArticlesState, setArticlesState] = useState<Array<Article>>([])
  const [totalPageState, setTotalPageState] = useState<number>(0)
  const searchParams = useSearchParams()
  const [queryParamsState, setQueryParamsState] = useState<QueryParams>({
    orderColumn: searchParams.get('order_column') || "created_at",
    orderBy: searchParams.get('order_by') || "DESC",
    page: searchParams.get('page') || "0",
    tag: searchParams.get('tag') || undefined,
  })

  useEffect(() => {
    const fetchData = async () => {
      const updatedQueryParams: QueryParams = {
        orderColumn: searchParams.get("order_column") || "created_at",
        orderBy: searchParams.get("order_by") || "DESC",
        page: searchParams.get("page") || "0",
        tag: searchParams.get("tag") || undefined,
      };
      setQueryParamsState(updatedQueryParams);

      const data = await getData(updatedQueryParams);
      const articles = toCast<any, Array<Article>>(data.body.articles);
      setTotalPageState(parseInt(data.body.total_page));

      if (articles) {
        setArticlesState(articles);
      }
    };

    fetchData();
  }, [searchParams]);  return(
    <>
      <div className={styles.title}>
        <PageTitle title="Articles"/>
      </div>
      <div className={styles.contents}>
        <div className={styles.main}>
          <div className={styles.recents}>
            <div className={styles.recents_head}>
              <ContentTitle title="All Posts" />
              <Paging totalPage={totalPageState} queryParams={queryParamsState}/>
            </div>
            <ArticleTable articles={ArticlesState}/>
            <div className={styles.recents_bottom}>
              <Paging totalPage={totalPageState} queryParams={queryParamsState}/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}