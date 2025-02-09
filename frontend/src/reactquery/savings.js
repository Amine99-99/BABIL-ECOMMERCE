import React from 'react'
import {Link} from 'react-router-dom'

const Saving=()=>{
    return(
         <div className='family'>
                    <Link to='/coming'>
                    <button className='btn-pro'>
                        <h1>
                        Your Savings
                        </h1>
                    <p className='des' >Manage Your Savings</p>
                    
                    </button>
            
                    </Link>

    </div>)
}
export default Saving