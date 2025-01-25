import React ,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

const Bell=()=>{
   const navigate= useNavigate()
    const [requests,setRequests] = useState([])
    const [isAdmin,setIsAdmin] =useState(false)

    useEffect(()=>{
        const getNote= async ()=>{
            try{
                const response = await fetch('/seen_request',{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json'

                    }

                })
                const data = await response.json()  
                if(response.ok){
                    if(Array.isArray){
                        
                        setRequests(data)
                        setIsAdmin(true)
                       
                    }
                }else{
                    setIsAdmin(false)
                    console.error('error',data)
                }    
                  }catch(err){
                    console.error(err,'error')
                  }
        }
        getNote()
    },[])
    if(!isAdmin)return <div>denied</div>
    return(
        <div>
            {requests && <p>{requests.length}</p>}
            <button onClick={()=>navigate('/notify')}><i class="fa-solid fa-bell"></i></button>
        </div>
    )


}
export default Bell