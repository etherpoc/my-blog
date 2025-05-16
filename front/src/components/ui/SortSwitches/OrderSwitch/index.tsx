import { ArticleData, orderType } from '@/types/data'
import styles from './styles.module.scss'
import { Dispatch, SetStateAction, useState } from 'react'

interface OrderSwitchProps {
    orderState: orderType
    setOrderState: Dispatch<SetStateAction<orderType>>
}

const OrderSwitch = ({orderState, setOrderState}:OrderSwitchProps) => {
    
    return (
    <div className={styles.order_switch_container}>
        <div className={styles.swicth_label}>Sort</div>
        <div className={styles.swiches}>
            <div className={
                `${styles.select_block} ${orderState=="new" ? styles.left: orderState=="title" ? styles.center:styles.right}`}/>
            <div className={orderState=="new"   ? styles.selected_order_value:styles.order_value } onClick={()=>{setOrderState("new")}}>  new</div>
            <div className={orderState=="title" ? styles.selected_order_value:styles.order_value } onClick={()=>{setOrderState("title")}}>title</div>
            <div className={orderState=="pv"    ? styles.selected_order_value:styles.order_value } onClick={()=>{setOrderState("pv")}}>   pv</div>
        </div>
    </div>
    )
}

export default OrderSwitch
