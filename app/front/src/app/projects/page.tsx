import styles from "./styles.module.scss"
import PageTitle from "@/components/ui/PageTitle";

export default async function ProjectsPage() {
  return(
    <>
      <div className={styles.title}>
        <PageTitle title="Projects"/>
      </div>
      <div className={styles.contents}>
        <div className={styles.main}>
          Comming soon...
        </div>
      </div>
    </>
  )
}