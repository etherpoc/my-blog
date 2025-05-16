'use client'
import styles from './styles.module.scss'
import ArticleTable from '@/components/article/ArticleTable';
import { ApiRequestConfig, HttpMethod } from '@/types/api';
import { Article } from '@/types/article';
import { apiFetcher } from '@/utils/apiFetcher';
import { getBaseUrl, toCast } from '@/utils/general';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

async function getData(queryOrderColumn:string, queryOrderBy:string, queryPage:string) {
    const baseUrl = getBaseUrl()

    const url = `${baseUrl}/api/articles/all`
    const config: ApiRequestConfig = {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        }
    }
    const res = await apiFetcher({
        url: url,
        method: HttpMethod.GET,
        config: config,
        queryParams: {
            order_column: queryOrderColumn,
            order_by: queryOrderBy,
            page: queryPage,
        }
    });
    return res
}

const Articles = () => {
    const [articles, setArticles] = useState<Array<Article>>([])
    const searchParams = useSearchParams()
  
    const queryOrderColumn = searchParams.get('order_column') || "created_at"
    const queryOrderBy = searchParams.get('order_by') || "DESC"
    const queryPage = searchParams.get('page') || "0"

    useEffect(()=>{
        const fetchData = async() => {
            const data = await getData(queryOrderColumn, queryOrderBy, queryPage);
            const articles = toCast<any, Array<Article>>(data.body.articles)
            console.log(articles)
            if (articles){
                setArticles(articles)
            }
        }
        fetchData()
    },[])

    return (
        <>
        <div className={styles.contents}>
            <div className={styles.all_posts}>
                <h2>投稿リスト</h2>
                <hr />
                <ArticleTable articles={articles} />
                <Link href={"/articles/0"}>+</Link>
            </div>
        </div>
        </>
    )
}

export default Articles