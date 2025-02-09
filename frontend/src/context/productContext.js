import React, { createContext, useState,useEffect } from 'react';
import { useProductArray, store_2, useProductArrayTwo } from '../custm.js';


export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const { store_1, isOneLoading, oneError } = useProductArray();
  const { store_3, isTwoLoading, twoError } = useProductArrayTwo();

  const [products, setProducts] = useState({
    store_1: [],
    store_2: [...store_2],
    store_3: []
  });
  useEffect(() => {
    if (store_1.length > 0) {
      setProducts((prev) => ({
        ...prev,
        store_1: [...store_1], 
      }));
    }
  }, [store_1])
  const removeProduct=(product)=>{
    
    setProducts((prev)=>{
      const updatedProducts = {...prev}
      for(const key in updatedProducts){
           updatedProducts[key] = updatedProducts[key].map((item)=>item.fob===product.fob?
        {...item,quantity:item.quantity-1}:item)}
        return updatedProducts;

      })
     
  }
  


  

  if (isOneLoading || isTwoLoading) return <div>...loading</div>;
  if (oneError) return <div>{oneError.message}</div>;
  if (twoError) return <div>{twoError.message}</div>;

  return (
    <ProductContext.Provider
      value={{ store_1:products.store_1,store_2: products.store_2, store_3,removeProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};
