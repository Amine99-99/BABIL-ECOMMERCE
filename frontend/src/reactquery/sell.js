import React ,{useState,useEffect} from'react'
import {useNavigate} from 'react-router-dom'



const MyOffer=()=>{
    const [myProduct,setMyProduct] =useState([])
    const navigate = useNavigate()


    useEffect(()=>{
        const getMyOffer=async()=>{
            try{
                const response = await fetch('/my_products',{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json'
                    },
    
                })
                const data = await response.json()
                if(response.ok){
                    if(Array.isArray(data)){
                        setMyProduct(data)
                        navigate('/myoffer')
                    }
                }
            }catch(err){
                console.error('err',err)
            }
            
        }
        getMyOffer()
    },[])
    const deleteProduct= async (productId)=>{
        try{
            const response = await fetch(`/delete/${productId}`,{
                method:'DELETE',
                headers:{
                    'Content-Type':'application/json'
                }
            })
            const data = await response.json()
            if(response.ok){
                if(Array.isArray(data))
                setMyProduct((prev)=>prev.filter((p)=>p.id ===productId))
                
            }
        }catch(err){
            console.error('err',err)
        }
    }
    return(
        <div className='main-content'>
            {myProduct.map((p)=><div key={p.id}>
                <p>{p.name}</p>
                <img src={p.image_url} style={{width:200,height:200}} alt={p.name}/>
                <button  onClick={()=>deleteProduct(p.id)}>Delete</button>
                <button>Update</button>
                </div>)}
        </div>
    )
}
export default MyOffer