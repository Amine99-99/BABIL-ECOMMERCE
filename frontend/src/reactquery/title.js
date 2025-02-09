import React from 'react'
import {Link} from 'react-router-dom'
const Logo=()=>{
  return(
    <div  className='logo'>
    <button className='log'><Link to='/' style={{display:'flex',justifyContent:'space-between',gap:3,alignItems:'center',textDecoration:'none',color:'white'}}>
    <img className='logo-img' src='https://www.shutterstock.com/image-vector/babel-vector-logo-babylonia-land-600nw-1509397283.jpg' alt={''}style={{width:45,height:35,backgroundColor:'#DC143C'}}/>
       BABIL
    </Link></button>
      </div>


  )
}
export default Logo