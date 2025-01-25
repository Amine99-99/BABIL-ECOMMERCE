import React from 'react';
import useProduct from '../hooks/useProduct.js';
import { Link, useParams } from 'react-router-dom';

const Products = () => {
  const { store_2 } = useProduct();
  const { category } = useParams();
  const catData = store_2.filter((item) => item.category === category);

  if (!catData.length) return <div>No items</div>;

  return (
    <div className='cat'>
      {catData.map((product) => (
        <Link style={{textDecoration:'none'}} to={`/${product.category}/${product.fob}`} key={product.fob}>
          <div className='product'>
          <img src={product.image} alt={product.name} className='image'  />
          <div style={{fontSize:10}} >
            <p>{product.title}</p>
            <p>Price:${product.price}</p>
            <p >In Stock:{product.quantity}</p>
            </div>
            
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Products;
