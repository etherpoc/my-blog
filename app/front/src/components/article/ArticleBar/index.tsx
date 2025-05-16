import styles from './styles.module.scss'
import Link from 'next/link'
import { Article } from '@/types/article'
import Tag from '@/components/ui/Tag'

type ArticleBarProps = {
  article: Article
}

export default function ArticleBar( {article}: ArticleBarProps ){
  const created_at = new Date(article.created_at)
  return (
    <div className={styles.bar}>
      <div className={styles.left}>
        <Link href={`articles/${article.id}`}>
          <img src={article.img_url} alt='sumnail' className={styles.sumnail} />
        </Link>
      </div>
      <div className={styles.right}>
        <Link href={`articles/${article.id}`} className={styles.title}>{article.title}</Link>
        <div className={styles.tags}>{article.tags.map((tag, index)=>{
          return (
            <Link href={`articles?tag=${tag}`} key={index} className={styles.tag}><Tag value={tag}/></Link>
          )
        })}</div>
        <div>posted_at&nbsp;:&nbsp;{`${created_at.getFullYear()}.${created_at.getMonth()+1}.${created_at.getDate()}`}</div>
      </div>
    </div>
  )
}
