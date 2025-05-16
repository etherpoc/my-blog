"use client"
import styles from "./styles.module.scss"
import { useEffect, useState } from "react"
import Menu from "./Menu"
import MenuButton from "./MenuButton"
import Icon from "./Icon"


const Header = () => {
  const [menuState, setMenuState] = useState<boolean>(false)
  useEffect(()=>{}, [menuState])
  return (
    <>
      <header className={styles.header_container}>
        <h1>karuisaba_admin</h1>
      </header>
      <Icon/>
      <MenuButton menuState={menuState} onClick={()=>{setMenuState(!menuState)}}/>
      {menuState ? <Menu onClickLink={()=>{setMenuState(false);}}/>: <></>}
    </>
  )
}

export default Header
