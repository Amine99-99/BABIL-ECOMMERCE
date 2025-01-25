import React ,{useState,useEffect} from 'react'



const Notification=()=>{
    const [requests,setRequests] = useState([])


    useEffect(()=>{
        const getRequests= async()=>{
            try{
                const response = await fetch('/seen_request',{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json'
                    }

                })
                const data=await response.json()
                if(response.ok){
                    if(Array.isArray(data)){
                        setRequests(data)

                    }else{
                        console.error('wrong',data)
                    }
                }

            }catch(err){
                console.error('error',err)
            }

        }
        getRequests()
    },[])
    const handleAction= async(action,requestId)=>{
        try{
            const response = await fetch(`/action/${requestId}`,{
                method:'POST',
                headers:{
                    'CONTENT-Type':'application/json'
                },
                body:JSON.stringify({action})

            })
            const data = await response.json()
            if(response.ok){
                setRequests((prev)=>
                    prev.map((request)=>request.id===requestId?
                {...request,status: action ==='approve'? 'approved':'rejected'}:request

                ))
            }else{
                console.log('failed to handle request',data)
            }

        }catch(err){
            console.error('error',err)
        }
    }
    return(
        <div className='container'>
            <h1>Requests</h1>
            {requests.map((request)=><div key={request.id}>
                <h6>{request.requested_role}---{request.name}---{request.timestamp}---{request.status}<button onClick={()=>handleAction('approve',request.id)}>Approve</button><button onClick={()=>handleAction('reject',request.id)}>Reject</button></h6>
                </div>)}
        </div>
    )



    

}
export default Notification