'use client'
import styles from './styles.module.scss'

interface PageTitleProps {
    title: String
}

const PageTitle = ({title}: PageTitleProps) => {
    return (<h1 className={styles.title}>{title}</h1>)
}

export default PageTitle