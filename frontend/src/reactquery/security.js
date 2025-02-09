import React from 'react'
import {Link} from 'react-router-dom'

const Security=()=>{
    return(
         <div className='family'>
                    <Link to='/coming'>
                    <button className='btn-pro'>
                        <h1>
                        Login& Security
                        </h1>
                    <p className='des'>Edit login,name,and mobile number</p>
                    </button>
            
                    </Link>

    </div>)
}
export default Security