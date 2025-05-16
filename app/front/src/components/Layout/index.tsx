import styles from "./styles.module.scss"
import Footer from "./Footer"
import Header from "./Header"

type LayoutProps = {
  children: React.ReactNode
}

export default function Layout ({children}: LayoutProps) {
  return (
    <>
      <Header/>
      <main className={styles.main}>{children}</main>
      <Footer/>
    </>
  )
}