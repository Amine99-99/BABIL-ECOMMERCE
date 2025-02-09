import React from 'react'
import {Link} from 'react-router-dom'

const Orders=()=>{
    return(
         <div className='family'>
                    <Link to='/coming'>
                    <button className='btn-pro'>
                        <h1>
                        Your Orders
                        </h1>
                    <p className='des'>track return,cancel an order,download invoice or buy again</p>
                    </button>
            
                    </Link>

    </div>)
}
export default Orders 