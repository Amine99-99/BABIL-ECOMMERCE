import React from 'react'
import {Link} from 'react-router-dom'
const Logo=()=>{
  return(
    <div className='logo'>
    <Link to='/trending' style={{display:'flex',justifyContent:'space-between',alignItems:'center',textDecoration:'none'}}>
    <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGsQJF2tiWvOuYsjDi7Fg17vCi18nHTuCR8g&s'} alt={''}style={{width:20,height:20,backgroundColor:'#DC143C'}}/>
       <button style={{backgroundColor:'#DC143C',color:'white',border:'none',fontWeight:'bold'}}>Babil</button>
    </Link>
      </div>


  )
}
export default Logo