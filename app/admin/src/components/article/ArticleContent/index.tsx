'use client'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { markdownToHTML } from '@/utils/markdown';
import { Article } from '@/types/article';
import { createArticle, updateArticle } from '@/utils/articles';
import Link from 'next/link';

export interface ArticleContentProps {
    article: Article;
    type: 'create'|'update'
}

const ArticleContent = ({article, type}:ArticleContentProps) => {
    const [articleState, setArticleState] = useState<Article>(article)
    const [markdownState, setMarkdownState] = useState("")
    useEffect(()=>{
        setArticleState(article)
    },[article])
    useEffect(()=>{
        const updateMD = async() => {
            const md = await markdownToHTML(articleState.content)
            setMarkdownState(md)
        }
        updateMD()
        
    },[articleState])
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
        <Link href="/articles">＜戻る</Link>
        <div className={styles.content}>
            <div className={styles.edit}>
                <h1>Edit</h1>
                <div>
                    <label htmlFor='input_title'>Title</label>
                    <input type='text' name='input_title' value={articleState.title} onChange={(e)=>{updateArticleState({title: e.target.value})}} placeholder='タイトル'/>
                </div>
                <div>
                    <label htmlFor='input_img_link'>SumnailURL</label>
                    <input type='text' name='input_img_link' value={articleState.img_url} onChange={(e)=>{updateArticleState({img_url: e.target.value})}} placeholder='サムネイルURL'/>
                </div>
                <div>
                    <label htmlFor='input_tags'>Tags</label>
                    <input type='text' name='input_tags' value={articleState.tags} onChange={(e)=>{updateArticleState({tags: e.target.value.split(',')})}}  placeholder='tag'/>
                </div>
                <div>
                    <label htmlFor='input_content'>Content</label>
                    <textarea name='input_content' value={articleState.content} onChange={(e)=>{updateArticleState({content: e.target.value})}}  placeholder='コンテンツ'/>
                </div>
                <div className={styles.save}>
                    {type=='create'?
                    <button onClick={()=>{
                        createArticle({...articleState}).then(()=>{
                            router.push('/articles');
                        });
                    }}>Create</button>:
                    <button onClick={()=>{updateArticle(articleState.id, {...articleState})}}>Save</button>}
                </div>
            </div>
            <div className={styles.markdown}>
                <h1>Preview</h1>
                <div dangerouslySetInnerHTML={{__html: markdownState }}/>
            </div>
        </div>
    </div>
        
    </>)
}

export default ArticleContent;