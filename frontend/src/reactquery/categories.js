import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  const [clicked, setClicked] = useState('');


  const handleClick = (category) => {

    setClicked(category);
  };

  return (
    <div>
      <section >
        <h1>Categories</h1>
        <ul className='list'>
          <Link className='b'  to='/Electronics' value={clicked} onClick={() => handleClick('Electronics')}><li>Electronics</li></Link>
          <Link className='b'   to='/Sports' onClick={() => handleClick('Sports')}><li>Sports wear</li></Link>
          <Link  className='b'  to='/Home and Kitchen' onClick={() => handleClick('Home and Kitchen')}><li>Home & Kitchen</li></Link>
          <Link className='b' to='/Motors' onClick={() => handleClick('Motors')}><li>Motors</li></Link>
          <Link className='b'  to='/Jewelry' onClick={() => handleClick('Jewelery')}><li>Jewelery</li></Link>
          <Link className='b'  to='/Beauty' onClick={() => handleClick('Beauty')}><li>Beauty Products</li></Link>
        </ul>
        <h1>My Store</h1>
     
        
        
      <div className='trade'>
        
      <Link to='/trade' className='btn-trade'> Product Listing Page</Link>
      <Link to='/offer' className='btn-offer'> Offer Page</Link>
      </div>
      
      </section>
    </div>
  );
};

export default Categories;
