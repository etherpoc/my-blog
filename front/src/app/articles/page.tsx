import { apiFetcher } from '@/services/api';
import { ApiFetcherConfig, ArticleData } from '@/types/data'
import styles from './styles.module.scss'
import ArticleTable from '@/components/Layout/Article/ArticleTable';
import PageTitle from "@/components/ui/PageTitle"


const getData = async () => {
    const rootUrl = "/articles";
    const config: ApiFetcherConfig = {
        method: "GET",
        cache: "no-store",
        // next: { revalidate: 3600}
    }
    const res = apiFetcher(rootUrl, config);
    return res;
}

const Articles = async () => {
    const data = await getData();
    const articles = data.data as Array<ArticleData>
    return (
        <>
        <div className={styles.title}>
            <PageTitle title={"Articles"}/>
        </div>
        <div className={styles.contents}>
            <div className={styles.all_posts}>
                <h2>投稿リスト</h2>
                <ArticleTable articles={articles} with_switches={true}/>
            </div>
        </div>
        </>
    )
}

export default Articles