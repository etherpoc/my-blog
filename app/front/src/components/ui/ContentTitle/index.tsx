'use client'
import styles from './styles.module.scss'

interface ContentTitleProps {
    title: String
}

const ContentTitle = ({title}: ContentTitleProps) => {
    return (<h2 className={styles.title}>{title}</h2>)
}

export default ContentTitle