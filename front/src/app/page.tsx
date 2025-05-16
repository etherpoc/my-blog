import { apiFetcher } from '@/services/api'
import { ApiFetcherConfig, ArticleData } from '@/types/data'
import styles from './styles.module.scss'
import ArticleTable from '@/components/Layout/Article/ArticleTable'
import PageTitle from "@/components/ui/PageTitle"

const getData = async () => {
    const rootUrl = "/articles/recent";
    const config: ApiFetcherConfig = {
        method: "GET",
        cache: "no-store",
        // next: { revalidate: 3600}
    }
    const res = apiFetcher(rootUrl, config);
    return res;
}

const Home = async () => {
    const data = await getData();
    const articles = data.data as Array<ArticleData>
    return (
        <>
        <div className={styles.title}>
            <PageTitle title={"Home"}/>
        </div>
        <div className={styles.contents}>
            <div className={styles.recent_posts}>
                <h2>最近の投稿</h2>
                <ArticleTable articles={articles}/>
            </div>
        </div>
        </>
    )
}

export default Home
