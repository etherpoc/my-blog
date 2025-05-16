import { ApiRequestConfig, HttpMethod } from "@/types/api";
import { apiFetcher } from "@/utils/apiFetcher";
import styles from "./styles.module.scss"
import PageTitle from "@/components/ui/PageTitle";
import ArticleTable from "@/components/article/ArticleTable";
import { getBaseUrl, toCast } from "@/utils/general";
import { Article } from "@/types/article";
import ContentTitle from "@/components/ui/ContentTitle";
import ArticleCardLarge from "@/components/article/ArticleCardLarge";


async function getData() {
  const baseUrl = getBaseUrl()
  const url = `${baseUrl}/api/articles/recent`
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

export default async function HomePage() {
  const data = await getData();
  const articles = toCast<any, Array<Article>>(data.body.articles)
  const recents = (articles || []).sort((a,b)=> a.created_at > b.created_at? -1:1)
  return(
    <>
      <div className={styles.title}>
        <PageTitle title="Home"/>
      </div>
      <div className={styles.contents}>
        <div className={styles.main}>
          <div className={styles.latest}>
            <ContentTitle title={"Latest"} />
            {recents.length ? <ArticleCardLarge article={recents[0]} />:<p>No Post</p>}
          </div>
          <div className={styles.recents}>
            <ContentTitle title={"Recents"} />
            <ArticleTable articles={recents.slice(1) || []}/>
          </div>
        </div>
      </div>
    </>
  )
}