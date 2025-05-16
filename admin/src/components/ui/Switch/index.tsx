import { reverseType } from '@/types/data'
import styles from './styles.module.scss'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import {v4} from 'uuid'
interface SwitchProps {
    id: number
    state: boolean
    onFunction: Function
    offFunction: Function
}

const Switch = ({id, state, onFunction, offFunction}:SwitchProps) => {
    const [stateState, setstateState] = useState(state)
    const onChangeStateFunction = (value: boolean) => {
        setstateState(value)
        if (value) onFunction()
        else offFunction()
    }
    useEffect(()=>{
        setstateState(state)
    },[id,state])
    return (
        <div className={styles.switch_container}>
            <input type='checkbox' id={`checkbox_state_${id}`} className={styles.switch_state} onChange={e => onChangeStateFunction(e.target.checked)} checked={stateState}/>
            <label className={styles.switch_items} htmlFor={`checkbox_state_${id}`}>
                <div className={styles.switch} >
                    <div className={styles.circle} />
                </div>
            </label>
        </div>
    )
}

export default Switch
