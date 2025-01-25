import  {useContext} from 'react'
import {AuthContext} from '../context/authContext.js'

const useAuth=()=>{
    return useContext(AuthContext)
}
export default useAuth