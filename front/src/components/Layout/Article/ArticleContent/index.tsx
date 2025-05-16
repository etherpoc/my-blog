import { ArticleData } from '@/types/data'
import styles from './styles.module.scss'
import { markdown_to_html } from '@/services/markdown';

export interface ArticleContentProps {
    article: ArticleData;
}

const ArticleContent = async ({article}:ArticleContentProps) => {
    const articleContentHtml = markdown_to_html(article.content)
    return (
    <>
    <div className={styles.body}>
        <h1 className={styles.title}>{article.title}</h1>
        <div className={styles.content} dangerouslySetInnerHTML={{__html: articleContentHtml }}/>
    </div>
        
    </>)
}

export default ArticleContent;