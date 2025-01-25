import {useContext} from 'react'
import {ProductContext} from '../context/productContext.js'

const useProduct=()=>{
  return useContext(ProductContext)
}
export default useProduct