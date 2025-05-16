'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import styles from './styles.module.scss'
import Link from 'next/link'

const Icon = () => {
  const { user, error } = useUser()
  return (
    user ?
    <div className={styles.logined}>
      <img src={user.picture!} alt={user.name!} />
      <Link href="/api/auth/logout">Logout</Link>
    </div>:
    <div className={styles.logouted}>
      <Link href="/api/auth/login">Login</Link>
    </div>
  )
}

export default Icon
