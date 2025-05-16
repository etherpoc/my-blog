'use client';
import styles from './styles.module.scss'
import Header from './Header'
import Footer from './Footer'
import { useUser } from '@auth0/nextjs-auth0/client'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({children}: LayoutProps) => {
  const { user, error } = useUser()
  return (
    <>
      <Header />
        <main className={styles.main}>
          {user ?children :<>Please Login</>}
          </main>
      <Footer />
    </>
  )
}

export default Layout
