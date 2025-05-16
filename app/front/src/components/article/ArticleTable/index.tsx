import { Article } from '@/types/article'
import ArticleBar from '@/components/article/ArticleBar'
import styles from './styles.module.scss'

interface ArticleTableProps {
    articles: Array<Article>
}

export default function ArticleTable({articles}: ArticleTableProps) {
  return (
    <>
      <div className={styles.posts}>
          {articles.length ? 
              articles.map((value, index) => {
                  return <ArticleBar article={value} key={index}/>
              }) : <>No Posts</>
          }
      </div>
    </>
  )
}