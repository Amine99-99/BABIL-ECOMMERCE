import React, { useState ,useEffect } from 'react';


import '../trade.css'



const UploadFile = () => {
  const [user, setUser] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [error, setError] = useState(null);
  const [success,setSuccess] =useState(null)
 

  const handleSelected = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    const newPreviews = [];
    selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result);
        if (newPreviews.length === selectedFiles.length) {
          setPreviews(newPreviews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append('user',user)
    formData.append('name',name)
    formData.append('price',price)
    formData.append('quantity',quantity)
    files.forEach((file)=>formData.append('image',file))
    
    
    setUser('');
    setName('');
    setPrice('');
    setQuantity('');
    setFiles([]);
    setPreviews([]);
    try{
      const response = await fetch('/offers',{
        method:'POST',
        body:formData
      })
      const result = await response.json()
      if(response.ok){
        setSuccess(result.message)
        setError(null)
      }else{
        setSuccess(null)
        setError(result.error? Object.values(result.error).flat().join(', '):result.message)
      }
    }catch(err){
      console.error('wrong',err)
    }
  };

  return (
    <div className='upload-file'>
      <h2 className='upload-title'>Upload Product</h2>
      <form className='upload-form' onSubmit={handleSubmit}>
        <div>
          <label>User:</label>
          <br/>
          <input 
            type='text' 
            onChange={(e) => setUser(e.target.value)} 
            value={user} 
            required className='upload'
          />
        </div>
        <div>
          <label>Product Name:</label>
          <br/>
          <input 
            type='text' 
            onChange={(e) => setName(e.target.value)} 
            value={name} 
            required className='upload'
          />
        </div>
        <div>
          <label>Price:</label>
          <br/>
          <input 
            type='number' 
            onChange={(e) => setPrice(e.target.value)} 
            value={price} 
            required className='upload'
          />
        </div>
        <div>
          <label>Quantity:</label>
          <br/>
          <input 
            type='number' 
            onChange={(e) => setQuantity(e.target.value)} 
            value={quantity} 
            required  className='upload'
          />
        </div>
        <div>
          <label>Upload Images:</label>
          <br/>
          {files &&
          <input 
            type='file' 
            onChange={handleSelected} 
            accept='image/*' 
            multiple 
            required className='upload'
          />}
        </div>
        <button className='upload-btn' type='submit' >Add Product</button>
      </form>
      <div className='upload-preview'>
        {previews.map((preview, index) => (
          <img 
          className='upload-image'
            key={index} 
            src={preview} 
            alt={`Preview-${index}`} 
            
          />
        ))}
      </div>
    </div>
  );
};

const Trade=()=>{
  const [isVendor,setIsVendor]=useState(false)
  useEffect(()=>{
    const getVendor= async ()=>{
      const response= await fetch('/trading',{
        method:'GET',
        header:{
          'Content-Type':'application/json'
        }


    })
      
      if(response.ok){
        setIsVendor(true)
      }else{
        setIsVendor(false)
      }
    }
    getVendor()
  },[])
  if (!isVendor) return <div>access denied</div>
  

  return(
    <div className='main-content'>
    <div className='trade-container'>
      
      <UploadFile/>
    
      
      
    </div>
    </div>
  )
}

export default Trade;
