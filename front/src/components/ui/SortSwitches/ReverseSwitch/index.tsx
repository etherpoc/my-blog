import { reverseType } from '@/types/data'
import styles from './styles.module.scss'
import { Dispatch, SetStateAction } from 'react'

interface ReverseSwitchProps {
  reverseState: reverseType
  setReverseState: Dispatch<SetStateAction<reverseType>>
}

const ReverseSwitch = ({reverseState, setReverseState}:ReverseSwitchProps) => {
    return (
        <div className={styles.reverse_switch_container}>
            <input type='checkbox' id='reverse_state' className={styles.reverse_state} onChange={e => { e.target.checked? setReverseState("desc"):setReverseState("asc")}}/>
            <label className={styles.switch_items} htmlFor='reverse_state'>
                <div className={styles.asc}>ASC</div>
                <div className={styles.switch} >
                    <div className={styles.circle} />
                </div>
                <div className={styles.desc}>DESC</div>
            </label>
        </div>
    )
}

export default ReverseSwitch
