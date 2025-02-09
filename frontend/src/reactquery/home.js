import React , {useState} from 'react' 
import { useNavigate,Outlet } from 'react-router-dom'

import Logo from './title.js'
import Search from './search.js'
import Categories from './categories.js'
import Trending from './trending.js'

import HeaderTwo from './header2.js'
import Account from './account.js'
import Cart from './cart.js'
import useCart from '../hooks/useCart.js'






const Home =()=>{
  const  {toggleCart} = useCart()

  const navigate=useNavigate()
  const [searchTerm,setSearchTerm] = useState('')
  const handleChange=(e)=>{
    setSearchTerm(e.target.value)
  }
  const handleResult=()=>{
    navigate(`/search?query=${searchTerm}`)
  }

  
  return(
      <>
    
      <div className='home-header'>
        
        <Logo/>
        <Search onChange={handleChange} onClick={handleResult} value={searchTerm}/>
        <Account/>
        <Cart/>
          

             

        
       
        
      
        <button className='log' onClick={()=>toggleCart()}><i class="fas fa-shopping-cart"></i></button>
        </div>
        
        <div className='header_2'><HeaderTwo/></div>
      
        <div className='sidebar'><Categories/></div>
        <div><Trending/></div>
      
        
        <Outlet/>
        
        </>
        

        
   

      



  )
}
export default Home