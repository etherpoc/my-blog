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
  return (
    <div className={styles.menu_container}>
      <ol>
        {links.map((value, index) => {
          return (
            <li key={index}>
              <div className={styles.navlink}>
                <Link href={value.uri} onClick={onClickLink}>
                  {value.name}
                </Link>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default Menu
