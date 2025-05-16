import { apiFetcher } from "@/services/api"
import { ApiFetcherConfig, ArticleData } from "@/types/data"
import PageTitle from "@/components/ui/PageTitle"
import styles from './styles.module.scss'
import { usePathname, useSearchParams } from 'next/navigation'
import ArticleContent from "@/components/Layout/Article/ArticleContent"

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
    const data = await getData(params.id);
    const article = data? data.data as ArticleData : null;
    return (<>
        {article? <ArticleContent article={article} />: <>404 not found</> }
    </>)
}

export default Article