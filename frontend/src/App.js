import React from 'react'
import router from './router/router.js'
import {RouterProvider} from 'react-router-dom'
import {ProductProvider} from './context/productContext.js'
import {CartProvider} from './context/cartContext.js'
import {AuthProvider} from './context/authContext.js'
import './App.css'






const App=()=>{
  return(
    <ProductProvider>
      <CartProvider>
        <AuthProvider>
  <div className='app-layout'>
    <RouterProvider router={router}/>
  </div>
  </AuthProvider>
  </CartProvider>
  </ProductProvider>
  )
}
export default App
    
  
  




