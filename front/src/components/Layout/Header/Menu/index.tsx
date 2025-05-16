import styles from './styles.module.scss'
import Link from 'next/link'

const Menu = () => {
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
                <Link href={value.uri}>
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
