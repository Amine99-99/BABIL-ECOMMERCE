
import React, { useContext } from 'react';
import {Link} from 'react-router-dom'
import { OfferContext } from '../context.js';


const Offer = () => {
  const { offers } = useContext(OfferContext);

  return (
    <div>
      {offers.length === 0 ? (
        <p>Offer not available</p>
      ) : (
        offers.map((offer, index) => (
          <div key={index}>
            <h1>{offer.name}</h1>
            <h2>{offer.price}</h2>
            {offer.files.map((imgSrc, idx) => (
              <img key={idx} src={imgSrc} alt={`Offer Preview-${idx}`} style={{ width: 200, height: 200 }} />
            ))}
            <p>Quantity: {offer.quantity}</p>
          </div>
        ))
      )}
      <Link to='/'>My Store</Link>
    </div>
  );
};

export default Offer;