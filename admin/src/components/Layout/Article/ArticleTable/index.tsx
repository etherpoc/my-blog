'use client'
import { ArticleData } from "@/types/data"
import styles from './styles.module.scss'
import { useState, useEffect } from "react"
import ArticleCard from "../ArticleCard"
import SortSwitches from "@/components/ui/SortSwitches"

interface ArticleTableProps {
    articles: Array<ArticleData>
    withSwitches?: boolean
    accessToken: string
}

const ArticleTable = ({articles, withSwitches=false, accessToken}: ArticleTableProps) => {
    const [articlesState, setArticlesState] = useState(articles)
    useEffect(()=>{}, [articlesState])
    const updateArticleState = (article: ArticleData) => {
        let articles = articlesState
        articles.forEach((element, index)=>{
            if(element.id===article.id) {
                articles[index]=article
                // return
            }
        })
        setArticlesState(articles)
        console.log(articlesState)
    }
    return (
        <>
        {articlesState && withSwitches? 
            <SortSwitches articles={articlesState} setArticlesState={setArticlesState}/> 
            : <></>
        }
        <div className={styles.posts}>
            <div className={styles.table_head}>
                <div className={styles.id}>ID</div>
                <div className={styles.title}>タイトル</div>
                <div className={styles.tags}>タグ</div>
                <div className={styles.pv}>PV数</div>
                <div className={styles.visibility}>公開情報</div>
                <div className={styles.save}></div>
                <div className={styles.detail}></div>
            </div>
            {articlesState ? 
                articlesState.map((value, index) => {
                    return (
                    <div key={index}>
                        <hr />
                        <ArticleCard index={index} article={value} updateArticleState={updateArticleState} accessToken={accessToken}/>
                    </div>)
                }) : <>No Posts</>
            }
        </div>
        </>
    )
}

export default ArticleTable