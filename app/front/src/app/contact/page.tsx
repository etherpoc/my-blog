import styles from "./styles.module.scss"
import PageTitle from "@/components/ui/PageTitle";

export default async function ContactsPage() {
  return(
    <>
      <div className={styles.title}>
        <PageTitle title="Contacts"/>
      </div>
      <div className={styles.contents}>
        <div className={styles.main}>
          Comming soon...
        </div>
      </div>
    </>
  )
}