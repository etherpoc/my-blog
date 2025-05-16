"use client"
import { ApiRequestConfig, HttpMethod } from '@/types/api';
import styles from './styles.module.scss'
import { apiFetcher } from '@/utils/apiFetcher';
import { getBaseUrl, toCast } from '@/utils/general';
import { Article } from '@/types/article';
import ArticleContent from '@/components/article/ArticleContent';
import { useEffect, useState } from 'react';

const getData = async (id: number) => {
    const baseUrl = getBaseUrl()
  
    const url = `${baseUrl}/api/articles/detail/${id}`
    const config: ApiRequestConfig = {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      }
    }
    const res = await apiFetcher({
        url: url,
        method: HttpMethod.GET,
        config: config
    });
    return res
}

const ArticlePage = ({ params }: { params: {id: string} }) => {
    const parsedId = parseInt(params.id);
    const [articleState, setArticleState] = useState({
        id: 0,
        title: "",
        img_url: "",
        tags: new Array<string>,
        content:"",
        visibility: false,
        created_at: new Date(),
        updated_at: new Date(),
    })
    if (parsedId==0){
        return (<>
            <div className={styles.article}><ArticleContent article={articleState} type="create" /></div>
        </>)
    }
    else {
        useEffect(()=>{
            const fetchData = async() => {
                const data = await getData(parsedId);
                const article = toCast<any, Article>(data.body.article)
                console.log(article)
                if(article){
                    setArticleState(article)
                }
            }
            fetchData()
        },[])
        return (<>
            {articleState? <div className={styles.article}><ArticleContent article={articleState} type="update" /></div>: <div className={styles.notfound}>404 not found</div> }
        </>)
    }
}

export default ArticlePage