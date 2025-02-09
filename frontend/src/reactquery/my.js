import React from 'react'
import {Link} from 'react-router-dom'

const My=()=>{
    return(
         <div className='family'>
                    <Link to='/myoffer'>
                    <button className='btn-pro'>
                        <h1>
                        my products
                        </h1>
                    <p className='des'>my listed products</p>
                    </button>
            
                    </Link>

    </div>)
}
export default My