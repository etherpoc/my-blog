import { ArticleData } from '@/types/data'
import styles from './styles.module.scss'
import Link from 'next/link'
import Switch from '@/components/ui/Switch'
import { useEffect, useState } from 'react'
import { updateArticle } from '@/services/articles'
import { getAccessToken } from '@auth0/nextjs-auth0'

interface ArticleCardProps {
  index: number
  article: ArticleData
  updateArticleState: Function
  accessToken: string
}

const ArticleCard = ({index, article, updateArticleState, accessToken}:ArticleCardProps) => {
  const [articleState, setArticleState] = useState(article)
  const changeVisibility = (value: boolean) => {
    let a = articleState
    a.visibility = value
    setArticleState(a)
    updateArticleState(a)
    console.log(articleState)
  }
  useEffect(()=>{
    setArticleState(article)
  }, [article])
  return (
    <div className={`${styles.article_card_container} ${index%2==0? styles.bg_color_1 : styles.bg_color_2}`}>
      <div className={styles.id}>{articleState.id}</div>
      <div className={styles.title}>
        <input value={articleState.title} onChange={()=>{}}/>
      </div>
      <div className={styles.tags}>
        <input value={articleState.tags} onChange={()=>{}}/>
      </div>
      <div className={styles.pv}>{articleState.pv}</div>
      <div className={styles.visibility}>
        <Switch id={articleState.id} state={articleState.visibility} onFunction={()=>{changeVisibility(true)}} offFunction={()=>{changeVisibility(false)}}/>
      </div>
      <div className={styles.save}>
        <button onClick={()=>{updateArticle(articleState.id, {...articleState}, accessToken)}}>Save</button>
      </div>
      <Link href={`/articles/${article.id}`} className={styles.detail}>
        Detail
      </Link>
    </div>
  )
}

export default ArticleCard
