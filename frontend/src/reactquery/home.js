import React , {useState} from 'react' 

import Account from './account.js'
import Logo from './title.js'
import Search from './search.js'
import Cart from'./cart.js'
import useCart from '../hooks/useCart.js'
import { useNavigate } from 'react-router-dom'


const Home =()=>{
  const {toggleCart} = useCart()
  const navigate=useNavigate()
  const [searchTerm,setSearchTerm] = useState('')
  const handleChange=(e)=>{
    setSearchTerm(e.target.value)
  }
  const handleResult=()=>{
    navigate(`/search?query=${searchTerm}`)
  }

  
  return(


      <div className='home-header'>
        
        <Logo/>
        <Search onChange={handleChange} onClick={handleResult} value={searchTerm}/>
          

             <Cart/>

        
       
        <Account/>
      
        <button className='cart_' onClick={toggleCart}><i class="fas fa-shopping-cart"></i></button></div>

        
   

      



  )
}
export default Home