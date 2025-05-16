import styles from './styles.module.scss'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { updateArticle } from '@/utils/articles'
import { Article } from '@/types/article'
import Switch from '@/components/ui/switchs/Switch'

interface ArticleCardProps {
  index: number
  article: Article
  updateArticleState: Function
}

const ArticleCard = ({index, article, updateArticleState}:ArticleCardProps) => {
  const [articleState, setArticleState] = useState(article)
  const changeVisibility = (value: boolean) => {
    let a = articleState
    a.visibility = value
    setArticleState(a)
    updateArticleState(a)
  }
  useEffect(()=>{
    setArticleState(article)
  }, [article])

  const onchange = (changeValue: {
    title?: string
    img_url?: string
    tags?: Array<string>
    content?: string
    visibility?: boolean
}) => {
    setArticleState({
        ...articleState,
        ...changeValue
    })
    updateArticleState(articleState)
}
  return (
    <div className={`${styles.article_card_container} ${index%2==0? styles.bg_color_1 : styles.bg_color_2}`}>
      <div className={styles.id}>{articleState.id}</div>
      <div className={styles.title}>
        <input value={articleState.title} onChange={(e)=>{onchange({title: e.target.value})}}/>
      </div>
      <div className={styles.tags}>
        <input value={articleState.tags} onChange={(e)=>{onchange({tags: e.target.value.split(',')})}}/>
      </div>
      <div className={styles.visibility}>
        <Switch id={articleState.id} state={articleState.visibility} onFunction={()=>{changeVisibility(true)}} offFunction={()=>{changeVisibility(false)}}/>
      </div>
      <div className={styles.save}>
        <button onClick={()=>{updateArticle(articleState.id, {...articleState})}}>Save</button>
      </div>
      <Link href={`/articles/${article.id}`} className={styles.detail}>
        Detail
      </Link>
    </div>
  )
}

export default ArticleCard
