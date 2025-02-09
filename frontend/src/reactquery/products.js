import React from 'react';
import useProduct from '../hooks/useProduct.js';
import { Link, useParams } from 'react-router-dom';

const Products = () => {
  const { store_2 } = useProduct();
  const { category } = useParams();
  const catData = store_2.filter((item) => item.category === category);

  if (!catData.length) return <div>No items</div>;

  return (
    <div className='main-content'>
    <div className='cat'>
      {catData.map((product) => (
       
          <div key={product.id}>
             <Link style={{textDecoration:'none'}} to={`/product/${product.category}/${product.fob}`} key={product.fob}>
             <div className='product'>
          <img src={product.image} alt={product.name} className='image'  />
          
            <p>{product.title}</p>
            <p>Price:${product.price}</p>
            <p >In Stock:{product.quantity}</p>
            </div>
           
            
            </Link>
            
       
            <button style={{backgroundColor:'black',color:'white',width:200,padding:10,margin:5,marginLeft:30,borderRadius:5}}>Add to the cart</button>
          </div>
         
           
        
      ))}

    </div>
    </div>
  );
};

export default Products;
