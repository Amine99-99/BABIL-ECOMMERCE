import React, { createContext, useState } from 'react';
import { useProductArray, store_2, useProductArrayTwo } from '../custm.js';


export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const { store_1, isOneLoading, oneError } = useProductArray();
  const { store_3, isTwoLoading, twoError } = useProductArrayTwo();

  const [products, setProducts] = useState({
    store_1: [...store_1],
    store_2: [...store_2],
    store_3: [...store_3]
  });

  

  if (isOneLoading || isTwoLoading) return <div>...loading</div>;
  if (oneError) return <div>{oneError.message}</div>;
  if (twoError) return <div>{twoError.message}</div>;

  return (
    <ProductContext.Provider
      value={{ store_1, store_2, store_3, products, setProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
};
