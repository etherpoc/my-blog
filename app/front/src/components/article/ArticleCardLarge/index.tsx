import styles from './styles.module.scss'
import Link from 'next/link'
import { Article } from '@/types/article'
import Tag from '@/components/ui/Tag'
import { markdownToHTML } from '@/utils/markdown'

type ArticleCardLargeProps = {
  article: Article
}

export default async function ArticleCardLarge( {article}: ArticleCardLargeProps ){
  const articleContentHtml = await markdownToHTML(article.content);
  const created_at = new Date(article.created_at)
  return (
    <div className={styles.largeCard}>
      <div className={styles.left}>
        <Link href={`articles/${article.id}`}>
          <img src={article.img_url} alt='sumnail' className={styles.sumnail}/>
        </Link>
      </div>
      <div className={styles.right}>
        <Link href={`articles/${article.id}`} className={styles.title}>{article.title}</Link>
        <div className={styles.tags}>{article.tags.map((tag, index)=>{
          return (
            <Link href={`article?search=true&tag=${tag}`} key={index} className={styles.tag}><Tag value={tag}/></Link>
          )
        })}</div>
        <div>posted_at&nbsp;:&nbsp;{`${created_at.getFullYear()}.${created_at.getMonth()+1}.${created_at.getDate()}`}</div>
        <hr/>
        <div className={styles.content} dangerouslySetInnerHTML={{__html: articleContentHtml}}/>
      </div>
    </div>
  )
}
