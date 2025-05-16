import styles from './styles.module.scss'
import Link from 'next/link'

interface ArticleCardProps {
  id: number
  img_url: string
  title: string
}

const ArticleCard = ({id, img_url, title}:ArticleCardProps) => {
  return (
    <Link href={`/articles/${id}`} className={styles.article_card_container}>
      <div>
        <img src={img_url} alt='Picture' className={styles.image} />
        <div className={styles.title}>{title}</div>
      </div>
    </Link>
  )
}

export default ArticleCard
