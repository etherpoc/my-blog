import styles from './styles.module.scss'

interface MenuButtonProps {
  onclick: () => void
}

const MenuButton = ({ onclick }: MenuButtonProps) => {
  return (
    <div className={styles.menu_button_container}>
      <input type="checkbox" id="menu_flag" className={styles.menu_flag} onChange={onclick} />
      <label className={styles.button} htmlFor="menu_flag">
        <span className={styles.line1} />
        <span className={styles.line2} />
        <span className={styles.line3} />
      </label>
    </div>
  )
}

export default MenuButton