"use client"
import styles from "./styles.module.scss"
import { useEffect, useState } from "react"
import Menu from "./Menu"
import MenuButton from "./MenuButton"


const Header = () => {
  const [menuState, setMenuState] = useState<boolean>(false)
  useEffect(()=>{}, [menuState])
  return (
    <>
      <header className={styles.header_container}>
        <h1>karuisaba</h1>
      </header>
      <MenuButton onclick={()=>{setMenuState(!menuState)}}/>
      {menuState ? <Menu onClickLink={()=>{setMenuState(false);}}/>: <></>}

    </>
  )
}

export default Header
