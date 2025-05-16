import { apiFetcher } from "@/services/api"
import { ApiFetcherConfig, ArticleData } from "@/types/data"
import styles from './styles.module.scss'
import ArticleContent from "@/components/Layout/Article/ArticleContent"
import { getArticle, updateArticle } from "@/services/articles"
import { getAccessToken } from "@auth0/nextjs-auth0"

interface ArticleProps {
    params: {
        id: string;
    }
}

const getData = async (id: string) => {
    const parsed_id = parseInt(id);
    if (isNaN(parsed_id)) return null;
    const rootUrl = `/articles/detail/${parsed_id}`
    const config: ApiFetcherConfig = {
        method: "GET",
        cache: "no-store",
        // next: { revalidate: 3600}
    }
    const res = apiFetcher(rootUrl, config);
    return res
}

const Article = async ({params}: ArticleProps) => {
    const accessToken = await getAccessToken();
    if(!accessToken.accessToken) {
        console.log("FAILED_TO_GET_ACCESS_TOKEN")
    }
    const parsed_id = parseInt(params.id);
    if (parsed_id==0){
        const article: ArticleData = {
            id: 0,
            title: "タイトル",
            img_url: "イメージURL",
            tags: ["タグ"],
            content:"コンテンツ",
            visibility: false,
            created_at: "",
            updated_at: "",
            pv: 0,
        }
        return (<>
            <div className={styles.article}><ArticleContent article={article} accessToken={accessToken.accessToken? accessToken.accessToken : ""} type="create" /></div>
        </>)
    }
    else {
        const data = await getArticle(parsed_id, accessToken.accessToken? accessToken.accessToken:"");
        const article = data && data.status==200? data.body.data as ArticleData : undefined;
        return (<>
            {article? <div className={styles.article}><ArticleContent article={article} accessToken={accessToken.accessToken? accessToken.accessToken : ""} type="update" /></div>: <div className={styles.notfound}>404 not found</div> }
        </>)
    }
}

export default Article