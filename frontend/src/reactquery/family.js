import React from 'react'
import {Link} from 'react-router-dom'
import useAuth from '../hooks/useAuth.js'


const Family=()=>{
    const {isAuthenticated} = useAuth()
    if(!isAuthenticated) return <div>Auth please</div>
    return(
        <div className='family'>
            <Link to='/members'>
            <button className='btn-pro'>
                <h1>
                Your Babil family
                </h1>
            <p className='des'>Manage profile and permission state</p>
            </button>
    
            </Link>
          
        </div>
    )
}
export default Family