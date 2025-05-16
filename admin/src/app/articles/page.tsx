import { getAllArticles } from '@/services/articles';
import styles from './styles.module.scss'
import ArticleTable from '@/components/Layout/Article/ArticleTable';
import { getAccessToken } from '@auth0/nextjs-auth0';
import Link from 'next/link';


const Articles = async () => {
    const accessToken = await getAccessToken();
    if(!accessToken.accessToken) {
        console.log("FAILED_TO_GET_ACCESS_TOKEN")
    }
    const data = await getAllArticles(accessToken.accessToken? accessToken.accessToken:"");
    return (
        <>
        <div className={styles.contents}>
            <div className={styles.all_posts}>
                <h2>投稿リスト</h2>
                <hr />
                {
                    data && data.status==200? 
                        <ArticleTable articles={data.body.data} withSwitches={true} accessToken={accessToken.accessToken? accessToken.accessToken : ""}/>
                        :
                        <></>
                }
                <Link href={"/articles/0"}>+</Link>
            </div>
        </div>
        </>
    )
}

export default Articles