import React from 'react'
import {Link} from 'react-router-dom'


import Logout from './logout.js'

const Account=()=>{
 
    
  return(
    <div className='nav'>
      <div className='x'>
        <div>
      <button className='log'><Link className='link'>Sign in </Link></button>
        </div>
        <div className='profile'>
        <div className='head'></div>
        <div className='bod'></div>
          </div>

        </div>
      <div className='drop-down'>
        <button className='btn'><Link to='/profile' className='link'>Your Account</Link></button>
        <button className='btn'><Link className='link'>Your Orders</Link></button>
        <button className='btn'><Link to='/register' className='link'>Register</Link></button>
        <button className='btn'><Link to='/login'  className='link'>Log in</Link></button>
        <button className='btn'><Logout/></button>

        </div>
        
           
       
    </div>
  )
}
export default Account