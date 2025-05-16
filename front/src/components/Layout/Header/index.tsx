"use client"
import styles from "./styles.module.scss"
import { useState } from "react"
import Menu from "./Menu"
import MenuButton from "./MenuButton"


const Header = () => {
  const [menuState, setMenuState] = useState<boolean>(false)
  return (
    <>
      <header className={styles.header_container}>
        <h1>etherpoc</h1>
      </header>
      <MenuButton onclick={()=>{setMenuState(!menuState)}}/>
      {menuState ? <Menu/>: <></>}

    </>
  )
}

export default Header
