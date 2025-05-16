'use client'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react'
import MenuButton from '@/components/ui/buttons/MenuButton'
import Link from 'next/link'

export default function Header() {
  const [menuState, setMenuState] = useState<boolean>(false)
  // useEffect(()=>{}, [menuState])
  
  // Navリンク情報
  const links = Array.from([
    { name: "Home", uri: "/" },
    { name: "Articles", uri: "/articles" },
    { name: "Projects", uri: "/projects" },
    { name: "Contact", uri: "/contact" },
    { name: "About", uri: "/about" },
  ])

  return (
    <>
      <header className={styles.header_container}>
        <MenuButton state={menuState} onClick={()=>setMenuState(!menuState)}/>
        <h1>karuisaba Blog</h1>
        {menuState &&
          <>
            <nav className={styles.nav_container}>
              {links.map((value, index) => {
                return (
                  <Link className={styles.navlink} href={value.uri} onClick={()=>{setMenuState(false)}} key={index}>
                    {value.name}
                  </Link>
                )
              })}
            </nav>
          </>}
      </header>
      {menuState && <div className={styles.spacer}/>}
    </>
  )
}