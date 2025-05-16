'use client'
import { ArticleData } from '@/types/data'
import styles from './styles.module.scss'
import { markdown_to_html } from '@/services/markdown';
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { createArticle, updateArticle } from '@/services/articles';

export interface ArticleContentProps {
    article: ArticleData;
    accessToken: string
    type: 'create'|'update'

}

const ArticleContent = ({article, accessToken, type}:ArticleContentProps) => {
    const [articleState, setArticleState] = useState(article)
    const router = useRouter()
    const updateArticleState = (changeValue: {
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
    }
    return (
    <>
    <div className={styles.body}>
        <div className={styles.content}>
            <div className={styles.edit}>
                <input type='text' value={articleState.title} onChange={(e)=>{updateArticleState({title: e.target.value})}}/>
                <input type='text' value={articleState.img_url} onChange={(e)=>{updateArticleState({title: e.target.value})}}/>
                <input type='text' value={articleState.tags} onChange={(e)=>{updateArticleState({tags: e.target.value.split(',')})}}/>
                <textarea value={articleState.content} onChange={(e)=>{updateArticleState({content: e.target.value})}}/>
            </div>
            <div className={styles.markdown}>
                <div dangerouslySetInnerHTML={{__html: markdown_to_html(articleState.content) }}/>
            </div>
        </div>
        <div className={styles.save}>
        {type=='create'?
        <button onClick={()=>{
            createArticle({...articleState}, accessToken).then(()=>{
                router.push('/articles');
            });
        }}>Create</button>:
        <button onClick={()=>{updateArticle(articleState.id, {...articleState}, accessToken)}}>Save</button>}
      </div>
    </div>
        
    </>)
}

export default ArticleContent;