import styles from "./styles.module.scss"
import PageTitle from "@/components/ui/PageTitle";

export default async function AboutPage() {
  return(
    <>
      <div className={styles.title}>
        <PageTitle title="About"/>
      </div>
      <div className={styles.contents}>
        <div className={styles.main}>
          Comming soon...
        </div>
      </div>
    </>
  )
}