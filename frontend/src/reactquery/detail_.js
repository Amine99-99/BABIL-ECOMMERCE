import React from 'react';
import { useParams } from 'react-router-dom';
import useProduct from '../hooks/useProduct.js';
import useCart from '../hooks/useCart.js';

const Trend = () => {
  const { store_1 ,removeProduct} = useProduct();
  const { addItem } = useCart();
  const { fob } = useParams();
  const product = store_1.find((item) => item.fob === fob);

  const handleAdd = (product) => {
    addItem(product);
    removeProduct(product)
  }

  if (!product) return <div>No product amine</div>;

  return (
    <div className='main-content'>
    <div className='detail'>
      <div className='e'>
      
      <img src={product.image} alt={product.name} className='image_1'   />
      </div>
      
      <div className='d'>
        <div style={{display:'flex',flexDirection:'column'}}>
      <p style={{borderBottom:'1px solid grey'}}>{product.title}</p>
      <p>Price:${product.price}</p>
      <p>In Stock:{product.quantity}</p>
      <img src={product.image} alt={product.name} className='image'   />

      </div>
      
      
      
      
      <button style={{width:200,height:40,backgroundColor:'black',color:'white',fontStyle:'bold'}} onClick={() => handleAdd(product)}>Add</button>
      </div>
    </div>
    </div>
  );
};

export default Trend;
