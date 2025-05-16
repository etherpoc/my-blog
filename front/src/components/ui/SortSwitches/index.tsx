'use client'
import { ArticleData, orderType, reverseType } from '@/types/data'
import styles from './styles.module.scss'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import OrderSwitch from './OrderSwitch'
import ReverseSwitch from './ReverseSwitch'

interface SortSwitchesProps {
  articles: Array<ArticleData>
  setArticlesState: Dispatch<SetStateAction<ArticleData[]>>
}

const SortSwitches = ({articles, setArticlesState}:SortSwitchesProps) => {
    const [orderState,   setOrderState]   = useState<orderType>("new");
    const [reverseState, setReverseState] = useState<reverseType>("asc");

    const sortArticles = () => {
        let sorted_array = JSON.parse(JSON.stringify(articles)) as  Array<ArticleData>
        switch(orderState){
            case 'new':
                sorted_array.sort((a, b)=>{
                    const ac = new Date(a.created_at).getTime()
                    const bc = new Date(b.created_at).getTime()
                    if (ac > bc)
                        return -1
                    else
                        return 1
                })
                break
            case 'title':
                sorted_array.sort((a, b)=>{
                    if (a.title.toUpperCase() < b.title.toUpperCase())
                        return -1
                    else
                        return 1
                })
                break
            case 'pv':
                sorted_array.sort((a, b)=>{
                    if (a.pv > b.pv)
                        return -1
                    else
                        return 1
                })
                break
        }
        if (reverseState=="desc") sorted_array.reverse()
        setArticlesState(sorted_array)
    }

    useEffect(()=>{
        sortArticles()
    }, [orderState, reverseState])

    return (
        <div className={styles.sort_switches_container}>
            <OrderSwitch    orderState  ={orderState}   setOrderState  ={setOrderState}/>
            <ReverseSwitch  reverseState={reverseState} setReverseState={setReverseState}/>
        </div>
    )
}

export default SortSwitches
