import React, { useState, useEffect } from 'react';
import useProduct from '../hooks/useProduct.js';
import useCart from '../hooks/useCart.js';
import { Link } from 'react-router-dom';

const Trending = () => {
  const { addItem } = useCart();
  const { store_1} = useProduct();
  const [products, setProducts] = useState(store_1.slice(0, 5));
  const [currentIdx, setCurrentIdx] = useState(5);
  

  const handleAdd = (product) => {
    addItem(product);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIdx = (currentIdx + 5) % store_1.length;
      setProducts(store_1.slice(currentIdx, nextIdx === 0 ? store_1.length : nextIdx));
      setCurrentIdx(nextIdx);
    }, 6000);
    
    return () => clearInterval(intervalId);
  }, [currentIdx,store_1]);

  return (
    <div>
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
            <button onClick={() => handleAdd(product)}>Add to the cart</button>
          </div>
        ))}
      </div>

     
    </div>
  );
};

export default Trending;
