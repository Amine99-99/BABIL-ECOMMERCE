import React,{createContext, useState} from 'react'
export const CartContext = createContext()
export const CartProvider=({children})=>{
  const [items,setItems] = useState([])
  const [isCartVisible,setCartVisible] = useState(false)
  const addItem=(product)=>{
    setItems((prevItems)=>{
      const existing = prevItems.find((item)=>item.fob===product.fob)
      if(existing){
        return prevItems.map((item)=> item.fob===product.fob?
        {...item,quantity:item.quantity+1}:item)
      }else{
        return [...prevItems,{...product,quantity:1}]

      }
    })
    setCartVisible(true)
 
  }
  const toggleCart=()=>{
    setCartVisible((prev)=>!prev)
  }
  const removeFromCart=(fob)=>{
    setItems((prevItems)=>{
      return prevItems.map((item)=>item.fob===fob?
    {...item,quantity:item.quantity-1}:item).filter((item)=>item.quantity>0)
    })
   
    
  }

  return(
    <CartContext.Provider value={{items,addItem,toggleCart,isCartVisible,removeFromCart}}>
      {children}
    </CartContext.Provider>
  )
}
