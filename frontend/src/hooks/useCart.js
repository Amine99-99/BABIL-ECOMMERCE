import {useContext} from 'react'
import {CartContext} from '../context/cartContext.js'

const useCart=()=>{
  return useContext(CartContext)
}
export default useCart