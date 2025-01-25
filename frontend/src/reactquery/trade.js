import React, { useState, useContext ,useEffect } from 'react';
import { AddContext,OfferContext } from '../context.js';
import {Link} from 'react-router-dom'
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
  const { addPro } = useContext(AddContext);

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
    const newProduct = {
      user: user,
      name: name,
      price: price, 
      quantity: quantity,
      files: previews,
    };
    addPro(newProduct);
    
    setUser('');
    setName('');
    setPrice('');
    setQuantity('');
    setFiles([]);
    setPreviews([]);
    try{
      const response = await fetch('/offers',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          name:name,
          price:price,
          quantity:quantity,
          image:previews



       } )
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
            required 
          />
        </div>
        <div>
          <label>Product Name:</label>
          <br/>
          <input 
            type='text' 
            onChange={(e) => setName(e.target.value)} 
            value={name} 
            required 
          />
        </div>
        <div>
          <label>Price:</label>
          <br/>
          <input 
            type='number' 
            onChange={(e) => setPrice(e.target.value)} 
            value={price} 
            required 
          />
        </div>
        <div>
          <label>Quantity:</label>
          <br/>
          <input 
            type='number' 
            onChange={(e) => setQuantity(e.target.value)} 
            value={quantity} 
            required 
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
            required 
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

const Uploaded = () => {
  const { products,setProducts } = useContext(AddContext);
  const { addOffer } = useContext(OfferContext);

  const postItem = (product) => {
    addOffer(product);
    setProducts([])
  };

  return (
    <div className='uploaded-product'>
      
      {products.map((product, index) => (
        <div className='product-card' key={index}>
          <h1>{product.name}</h1>
          <h2>${product.price}</h2>
          {product.files.map((imgSrc, idx) => (
            <img key={idx} src={imgSrc} alt={`Preview-${idx}`} style={{ width: 200, height: 200 }} />
          ))}
          <button className='post-btn' onClick={() => postItem(product)}>Post</button>
        </div>
      ))}
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
      const data = await response .json()
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
    <div className='trade-container'>
      
      <UploadFile/>
      <Uploaded/>
      
      <Link className='offer' to='/offer'> Offer Page</Link>
    </div>
  )
}

export default Trade;
