import {useContext } from 'react'
import {TradeContext} from '../context/tradeContext.js'


const useTrade=()=>{
    return useContext(TradeContext)
}
export default useTrade