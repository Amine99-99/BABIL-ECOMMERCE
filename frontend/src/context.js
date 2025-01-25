import React ,{useState,createContext} from 'react'




export const OfferContext = createContext();
export const AddContext = createContext();

export const ProProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const addPro = (newProduct) => {
    setProducts([...products, newProduct]);
    
  };

  return (
    <AddContext.Provider value={{ products,setProducts, addPro }}>
      {children}
    </AddContext.Provider>
  );
};

export const OfferProvider = ({ children }) => {
  const [offers, setOffers] = useState([]);

  const addOffer = (product) => {
    setOffers((prevOffer) => {
      const existing = prevOffer.find((offer) => offer.name === product.name);
      if (existing) {
        return prevOffer.map((offer) =>
          offer.name === product.name
            ? { ...offer, quantity: offer.quantity + 1 }
            : offer
        );
      } else {
        return [...prevOffer, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <OfferContext.Provider value={{ offers, addOffer }}>
      {children}
    </OfferContext.Provider>
  );
};




