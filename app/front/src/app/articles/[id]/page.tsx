import { ApiRequestConfig, HttpMethod } from "@/types/api";
import { apiFetcher } from "@/utils/apiFetcher";
import styles from "./styles.module.scss"
import { getBaseUrl, toCast } from "@/utils/general";
import { Article } from "@/types/article";
import ArticleContent from "@/components/article/ArticleContent";


async function getData(id: number) {
  const baseUrl = getBaseUrl()

  const url = `${baseUrl}/api/articles/detail/${id}`
  const config: ApiRequestConfig = {
    cache: "no-store"
  }
  const res = await apiFetcher({
    url: url,
    method: HttpMethod.GET,
    config: config
  });
  return res
}

export default async function ArticleContentPage({ params }: { params: {id: string} }) {

  const parsedId = parseInt(params.id)
  const data = await getData(parsedId);
  const article = toCast<any, Article>(data.body.article)
  return(
    <>
      <div className={styles.contents}>
        <div className={styles.main}>
          {article? <ArticleContent article={article} />:<>Not Found</>}
        </div>
      </div>
    </>
  )
}