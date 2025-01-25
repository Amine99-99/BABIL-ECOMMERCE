import React, { useState } from 'react';
import useProduct from '../hooks/useProduct.js';


const Promotion=()=>{
    const {store_3} = useProduct()
    const products = store_3.products
    return(
        <div>
            <h1>Promotion</h1>
            {products.map((product)=>{
                <div key={product.id}>
                    <img src={product.image} alt={product.title} style={{height:100,width:100}}/>
                    <p>{product.title}</p>
                    <p>{product.price}</p>
                </div>
            })}
        </div>
    )
}
export default Promotion