import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  const [clicked, setClicked] = useState('');


  const handleClick = (category) => {

    setClicked(category);
  };

  return (
    <div className='red'>
      <section >
      <h1>Categories</h1>
       
        <ul className='list'>
       
          <Link className='b'  to='product/Electronics' value={clicked} onClick={() => handleClick('Electronics')}><li className='c' >Electronics</li></Link>
          <Link className='b'   to='product/Sports' onClick={() => handleClick('Sports')}><li className='c'>Sports wear</li></Link>
          <Link  className='b'  to='product/Home and Kitchen' onClick={() => handleClick('Home and Kitchen')}><li className='c'>Home & Kitchen</li></Link>
          <Link className='b' to='product/Motors' onClick={() => handleClick('Motors')}><li className='c'>Motors</li></Link>
          <Link className='b'  to='product/Jewelry' onClick={() => handleClick('Jewelery')}><li className='c'>Jewelery</li></Link>
          <Link className='b'  to='product/Beauty' onClick={() => handleClick('Beauty')}><li className='c'>Beauty Products</li></Link>
        </ul>
        <h1>My POS</h1>
        <select style={{padding:15,borderRadius:5,backgroundColor:'black',color:'white'}}>
          <option defaultValue>Point of Sale</option>
          <option>POS Restaurant</option>
          <option>POS Coffee</option>
          <option>POS Pharmacy</option>
          <option>POS Hardware Store</option>
        </select>
        
     
        
  
      
      </section>
    </div>
  );
};

export default Categories;
