import styles from './styles.module.scss'
import { Article } from "@/types/article";
import { markdownToHTML } from "@/utils/markdown";

type ArticleContentProps = {
  article: Article
}

export default async function ArticleContent({article}: ArticleContentProps){
  const articleContentHtml = await markdownToHTML(article.content)
  const created_at = new Date(article.created_at)
  const updated_at = new Date(article.updated_at)
  return (
    <>
      <div className={styles.body}>
        <h1 className={styles.title}>{article.title}</h1>
        <div className={styles.dates}>
          <div>posted_at&nbsp;&nbsp;&nbsp;:&nbsp;{`${created_at.getFullYear()}.${created_at.getMonth()+1}.${created_at.getDate()}`}</div>
          <div>updated_at&nbsp;:&nbsp;{`${updated_at.getFullYear()}.${updated_at.getMonth()+1}.${updated_at.getDate()}`}</div>
        </div>
        <div className={styles.content} dangerouslySetInnerHTML={{__html: articleContentHtml}} />
      </div>
    </>
  )
}