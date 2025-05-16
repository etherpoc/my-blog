'use client'
import { useState } from 'react'
import styles from './styles.module.scss'

type ChoicesSwitchProps = {
  initChoice: string
  choices: string[]
  onChange: (state: string) => void
}

export default function ChoicesSwitch ({ initChoice, choices, onChange }: ChoicesSwitchProps) {
  type choiceType = typeof choices[number]
  const [state, setState] = useState<choiceType>(initChoice)
  return (
    <div className={styles.switch_container}>
      <ol className={styles.choices}>
        {choices.map((value, index)=>{
          return(
            <li className={state===value? styles.selected_choice:styles.choice} onClick={()=>{
              setState(value)
              onChange(value)
              console.log("awdadawwda")
            }} key={index}>{value}</li>
          )
        })}
      </ol>
    </div>
  )
}
