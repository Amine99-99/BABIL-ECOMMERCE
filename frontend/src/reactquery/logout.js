import React from 'react'
import {useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth.js'


const Logout=()=>{
  
    const navigate = useNavigate()
    const {logout} = useAuth()
    const handleLogout=()=>{
        logout()
    }
    
    return(
        <div>
            
            <button onClick={()=>{handleLogout();navigate('/trending')}}>Log out</button>
        </div>
    )
}
export default Logout