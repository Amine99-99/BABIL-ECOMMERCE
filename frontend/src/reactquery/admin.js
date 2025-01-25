import React,{useState,useEffect}from 'react'
import Bell from './bell.js'




const Admin=()=>{
    const [success,setSuccess]=useState(null)
    const [isAdmin,setIsAdmin] =useState(false)
    

    useEffect(()=>{
        const getAdmin=async()=>{
            try{
            const response = await fetch('/admin',{
                method:'GET',
                headers:{
                    'Content-Type':'application.json'
                }
            })
            const data =  await response.json()
            if(response.ok){
                setSuccess(data.message)
                setIsAdmin(true)
            
          
            }else{
                setIsAdmin(false)
            }
            }catch(error){
                console.error('error',error)
            }
            

            
            
        }
        getAdmin()
    },[])
    if(!isAdmin) return <div>Access denied</div>
   
    return (
        <div>
            {success && <p>{typeof success === 'string' ? success : JSON.stringify(success)}</p>}
            <p>Welcome to admin page</p>
            <Bell/>
          
        </div>
    )

    

}
export default Admin