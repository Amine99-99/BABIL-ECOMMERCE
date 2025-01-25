import React from 'react'
import {Link} from 'react-router-dom'
import useAuth from '../hooks/useAuth.js'


const Family=()=>{
    const {isAuthenticated} = useAuth()
    if(!isAuthenticated) return <div>Auth please</div>
    return(
        <div>
            <Link to='/members'>
            <button>
                <h1>
                Your Babil family
            </h1>
            <p>Manage profile and permission state</p>
            </button>
    
            </Link>
        </div>
    )
}
export default Family