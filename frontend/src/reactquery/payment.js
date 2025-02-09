import React from 'react'
import {Link} from 'react-router-dom'

const Payment=()=>{
    return(
         <div className='family'>
                    <Link to='/coming'>
                    <button className='btn-pro'>
                        <h1>
                        Your Payments
                        </h1>
                    <p className='des'>View all transactions, manage payment methods and settings</p>
                    </button>
            
                    </Link>

    </div>)
}
export default Payment