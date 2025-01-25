import React, {createContext,useEffect,useState} from 'react'

export const AuthContext = createContext()


export const AuthProvider=({children})=>{
    const [isAuthenticated,setIsAuthenticated] = useState(false)

    useEffect(()=>{
        const getAuth= async() =>{
            try{
                
                const response = await fetch('/auth_status');
                const data = response.json()
                if(data.is_authenticated){
                    setIsAuthenticated(true)
                }else{
                    setIsAuthenticated(false)
                }

            }catch(error){
                console.error('error',error)
            }
           
        }
        getAuth()
    },[])

    const logout= async ()=>{
        try{
            await fetch('/logout',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                }
            }) 
            setIsAuthenticated(false)
        }catch(error){
            console.error('errro',error)
        }

    }
    return(
        <AuthContext.Provider value={{isAuthenticated,setIsAuthenticated,logout}}>
            {children}
        </AuthContext.Provider>

    )




}