'use client'
import { useState } from 'react'
import styles from './styles.module.scss'

type SimpleSwitchProps = {
  initState: boolean
  onChange: (state: string) => void
}

export default function SimpleSwitch ({ initState, onChange }: SimpleSwitchProps) {
  const [state, setState] = useState<boolean>(initState)
  return (
    <div className={styles.switch_button_container}>
      
    </div>
  )
}
