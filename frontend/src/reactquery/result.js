import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useCart from '../hooks/useCart.js';
import useProduct from '../hooks/useProduct.js';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Result = () => {
 
  const { store_2 } = useProduct();
  const { addItem } = useCart();
  const query = useQuery();
  const searchTerm = query.get('query') || ''; 

  const handleAdd = (product) => {
    addItem(product);
  };

  const [result, setResult] = useState([]);

  useEffect(() => {
    if (!store_2 || store_2.length === 0) {
      setResult([]);
      return;
    }

    const filteredArr = store_2.filter((item) => {
      const matchSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchSearch;
    });

    setResult(filteredArr);
  }, [store_2, searchTerm]);

  return (
    <div className='cat'>
      {result.length > 0 ? (
        result.map((item) => (<div>
          <div key={item.id} className='product'>
             <img
              src={item.image}
              alt={item.title}
              className='image'
            />
            <h1>{item.title}</h1>
            <h2>{item.quantity}</h2>
            <h2>${item.price}</h2>
           
            
          </div>
          <button onClick={() => handleAdd(item)}>add to the cart</button>
          </div>
        ))
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default Result;
