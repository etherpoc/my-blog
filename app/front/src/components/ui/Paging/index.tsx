import Link from 'next/link';
import styles from './styles.module.scss'

type PagingProps = {
  totalPage: number;
  queryParams: {
    orderColumn: string;
    orderBy: string;
    page: string;
    tag?: string;
  }
}

export default function Paging ({ totalPage, queryParams }: PagingProps) {
  const page = parseInt(queryParams.page)
  const previousParams = new URLSearchParams({
    "order_column": queryParams.orderColumn,
    "order_by": queryParams.orderBy,
    "page": `${page-1}`,
    ...(queryParams.tag && {"tag": queryParams.tag}),
  })
  const nextParams = new URLSearchParams({
    "order_column": queryParams.orderColumn,
    "order_by": queryParams.orderBy,
    "page": `${page+1}`,
    ...(queryParams.tag && {"tag": queryParams.tag}),
  })
  return (
    <div className={styles.paging_container}>
      {page>0 && <Link href={`articles?${previousParams.toString()}`} className={`${styles.paging_button} ${styles.previous_button}`}><span>&lt;--</span></Link>}
      <div className={styles.page}>{page+1}/{totalPage}</div>
      {page+1<totalPage && <Link href={`articles?${nextParams.toString()}`} className={`${styles.paging_button} ${styles.next_button}`}><span>--&gt;</span></Link>}
    </div>
  )
}
