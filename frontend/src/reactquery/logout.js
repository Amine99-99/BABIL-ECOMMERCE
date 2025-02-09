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
            
            <button style={{backgroundColor:'red', border:'none',padding:5}} onClick={()=>{handleLogout();navigate('/')}}>Log out</button>
        </div>
    )
}
export default Logout