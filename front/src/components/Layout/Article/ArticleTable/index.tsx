'use client'
import { ArticleData } from "@/types/data"
import styles from './styles.module.scss'
import { useState, useEffect } from "react"
import ArticleCard from "../ArticleCard"
import SortSwitches from "@/components/ui/SortSwitches"

interface ArticleTableProps {
    articles: Array<ArticleData>
    with_switches?: boolean
}

const ArticleTable = ({articles, with_switches=false}: ArticleTableProps) => {
    const [articlesState, setArticlesState] = useState(articles)
    useEffect(()=>{
    }, [articlesState])
    return (
        <>
        {articlesState && with_switches? 
            <SortSwitches articles={articlesState} setArticlesState={setArticlesState}/> 
            : <></>
        }
        <div className={styles.posts}>
            {articlesState ? 
                articlesState.map((value, index) => {
                    return (<ArticleCard id={value.id} img_url={value.img_url} title={value.title} key={index}/>)
                }) : <>No Posts</>
            }
        </div>
        </>
    )
}

export default ArticleTable