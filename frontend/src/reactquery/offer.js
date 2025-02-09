
import React, { useEffect ,useState} from 'react';





const Offer = () => {
 
  const [products,setProducts] = useState([])


  useEffect(()=>{
    const getMyProduct= async()=>{
      try{
        const response = await fetch('/my_product',{
          method:'GET',
          headers:{
            'Content-Type':'application/json'
          },
  
  
        })
        const product=await response.json()
        if(response.ok){
          if(Array.isArray(product)){
            setProducts(product)
          }
  
        }else{
          console.log('error')
        }
      }catch(err){
        console.error('error',err)
      }
 
    }
    getMyProduct()

  },[])

  return (
    <div className='main-content'>
    <div className='offer'>
      {
        products.map((p) => (
          <div key={p.id}>
            <h1>{p.name}</h1>
            <h2>{p.price}</h2>
            <img src={p.image_url} style={{width:200,height:200}} alt={p.name}/>
            <p>Quantity: {p.quantity}</p>
            <p><a href={`mailto:${p.email}`}>send email</a></p>

          </div>
        )
      )}
      
    </div>
    </div>
  );
};

export default Offer;