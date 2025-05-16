import { useUser } from '@auth0/nextjs-auth0/client'
import styles from './styles.module.scss'
import Link from 'next/link'

interface MenuProps {
  onClickLink: () => void
}

const Menu = ({onClickLink}:MenuProps) => {
  const links = Array.from([
    { name: "HOME", uri: "/" },
    { name: "ARTICLES", uri: "/articles" },
    { name: "ABOUT", uri: "/about" },
  ])
  const { user, error } = useUser()
  return (
    <div className={styles.menu_container}>
      <ol>
        {user? links.map((value, index) => {
          return (
            <li key={index}>
              <div className={styles.navlink}>
                <Link href={value.uri} onClick={onClickLink}>
                  {value.name}
                </Link>
              </div>
            </li>
          )
        }): 
        <li key={0}>
          <div className={styles.navlink}>
            <Link href="/" onClick={onClickLink}>
              HOME
            </Link>
          </div>
        </li>}
      </ol>
    </div>
  )
}

export default Menu
