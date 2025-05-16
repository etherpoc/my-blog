import styles from './styles.module.scss'

type TagProps = {
  value: string,
}

export default function Tag ({ value }: TagProps) {
  return (
    <div className={ styles.tag }>{value}</div>
  )
}