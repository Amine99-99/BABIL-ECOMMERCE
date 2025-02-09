import React from 'react'
import {Link} from 'react-router-dom'

const Address=()=>{
    return(
         <div className='family'>
                    <Link to='/coming'>
                    
                    <button className='btn-pro'>
                        <div>
                        
                        
                  
                        <h1>
                        Your Addresses
                        </h1>
                    <p className='des'>edit,remove or set default addresse</p>
                    
                    </div>
                    </button>
            
                    </Link>

    </div>)
}
export default Address