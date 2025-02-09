import React ,{useState} from 'react'
import {Link} from 'react-router-dom'

const Request=()=>{
    const [form,setForm]=useState({
    
        requested_role:''
    })
    const [success,setSuccess]= useState(null)
    const [error,setError] = useState(null)
    const handleChange=(e)=>{
        const {value,id} = e.target
        setForm({...form,[id]:value})
        
    }
    const handleSubmit= async (e)=>{
        e.preventDefault()
        try{
            const response = await fetch('/role_request',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    requested_role:form.requested_role
                })
            })
            const data = await response.json()
            if(response.ok){
                setSuccess(data.message)
                setError(null)
            }else{
                setSuccess(null)
                setError(data.errors ? Object.values(data.errors).flat().join(', '):data.message)
            }
        }catch(err){
            setError('wrong')
            
            setSuccess(null)
        }
    }
    return(
        <div className='main-content'>
        <div className='req-pg'>
            
            <form method='POST' onSubmit={handleSubmit}>
                
                <div className='req'>
                    <label>Role request</label>
                    <input type='text' id='requested_role' palceholder='your new role' onChange={handleChange} value={form.requested_role}/>
                    <button className='btn-req' type='submit'>Request</button>
                </div>
                

            </form>
            {success && <p>{typeof success === 'string' ? success : JSON.stringify(success)}</p>}
            {error && <p>{typeof error==='string' ? error:JSON.stringify(error)}</p>}
            <Link style={{textDecoration:'none',color:'black',marginLeft:'-50rem'}} to='/members'>Prev</Link>
        </div>
        </div>

    )
}
export default Request
