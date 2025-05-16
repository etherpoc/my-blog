import styles from './styles.module.scss'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({children}: LayoutProps) => {
  return (
    <>
      <Header />
        <main className={styles.main}>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
