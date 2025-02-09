import React, { useState, useEffect } from 'react';
import useProduct from '../hooks/useProduct.js';
import useCart from '../hooks/useCart.js';
import { Link } from 'react-router-dom';

const Trending = () => {
  const { addItem } = useCart();
  const { store_1=[],store_3} = useProduct();
  const [products, setProducts] = useState(store_1.slice(0, 4));
  const [currentIdx, setCurrentIdx] = useState(4);

  

  const handleAdd = (product) => {
    addItem(product);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIdx = (currentIdx + 4) % store_1.length;
      setProducts(store_1.slice(currentIdx, nextIdx === 0 ? store_1.length : nextIdx));
      setCurrentIdx(nextIdx);
    }, 6000);
    
    return () => clearInterval(intervalId);
  }, [currentIdx,store_1]);
 

  return (
    <div className='main-content'>
    
      <h6 style={{color:'grey',fontSize:20}}>TRENDING PRODUCTS</h6>
      <div className='trending'>
        {products.map((product) => (
          <div key={product.fob}>
            <Link style={{ textDecoration: 'none' }} to={`/trending/${product.fob}`}>
              <div className='product'>
                <img src={product.image} alt={product.title} className='image' />
                <h1>{product.title}</h1>
                <h2>${product.price}</h2>
                <h2>{product.quantity}</h2>
              </div>
            </Link>
            <button style={{backgroundColor:'black',color:'white',width:200,padding:10,margin:5,marginLeft:30,borderRadius:5}} onClick={() => handleAdd(product)}>Add to the cart</button>
          </div>
        ))}
      </div>
      


     
    </div>
  );
};

export default Trending;
