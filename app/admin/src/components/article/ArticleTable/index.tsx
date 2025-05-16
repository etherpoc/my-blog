'use client'
import styles from './styles.module.scss'
import { useState, useEffect } from "react"
import ArticleCard from "../ArticleCard"
import { Article } from '@/types/article'

interface ArticleTableProps {
    articles: Array<Article>
}

const ArticleTable = ({articles}: ArticleTableProps) => {
    const [articlesState, setArticlesState] = useState(articles)
    useEffect(()=>{
        setArticlesState(articles)
    }, [articles])

    const updateArticlesState = (article: Article) => {
        let articles = articlesState
        articles.forEach((element, index)=>{
            if(element.id===article.id) {
                articles[index]=article
            }
        })
        setArticlesState(articles)
    }
    
    return (
        <>
        <div className={styles.posts}>
            <div className={styles.table_head}>
                <div className={styles.id}>ID</div>
                <div className={styles.title}>タイトル</div>
                <div className={styles.tags}>タグ</div>
                <div className={styles.visibility}>公開情報</div>
                <div className={styles.save}></div>
                <div className={styles.detail}></div>
            </div>
            {articlesState ? 
                articlesState.map((value, index) => {
                    return (
                    <div key={index}>
                        <hr />
                        <ArticleCard index={index} article={value} updateArticleState={updateArticlesState}/>
                    </div>)
                }) : <>No Posts</>
            }
        </div>
        </>
    )
}

export default ArticleTable