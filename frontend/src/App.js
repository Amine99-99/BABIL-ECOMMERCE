import React from 'react'
  import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
  import Home from './reactquery/home.js'
  import './App.css'
  
  
  import {ProductProvider} from './context/productContext.js'
  import {CartProvider} from './context/cartContext.js'
  import Detail from './reactquery/detail.js'
  import Trending from './reactquery/trending.js'
  import Categories from './reactquery/categories.js'
  import Products from './reactquery/products.js'
  import Trend from './reactquery/detail_.js'
  import Result from './reactquery/result.js'
  import Trade from './reactquery/trade.js'
  import Offer from './reactquery/offer.js'
  import SSS from './reactquery/store_x.js'
  import Register from './reactquery/register.js'
  import Login from './reactquery/login.js'
  import Profile from './reactquery/profile.js'
  import Request from './reactquery/request.js'
  import Members from './reactquery/members.js'
  import ProtectedRoute from './reactquery/protected.js'
  import Admin from './reactquery/admin.js'
  import Notification from './reactquery/notification.js'
  
  import {ProProvider,OfferProvider} from './context.js'
  import {AuthProvider} from './context/authContext.js'
  
  
  const App=()=>{
    return(
      <ProductProvider>
        <CartProvider>
          <ProProvider>
          <OfferProvider>
            <AuthProvider>
      <Router >
        <div className='app-layout'>
      <div>
      <Home/>
        </div>
        <div className='container'>
        <div className='sidebar'>
      <Categories />
          </div>
          <div className='main-content'>
        <Routes>
          <Route path='/trending' element={<Trending/>}/>

          <Route path='/trending/:fob' element={<Trend/>}/>
  
          <Route path='/:category' element={<Products/>}/>
          <Route path='/:category/:fob' element={<Detail/>}/>
          <Route path='/' element={<SSS />}/>
          
          <Route path='/search' element={<Result/>}/>
          <Route path='/trade' element={<ProtectedRoute><Trade/></ProtectedRoute>}/>
          <Route path='/offer' element={<Offer/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
          <Route path='/members' element={<Members/>}/>
          <Route path='/request' element={<ProtectedRoute><Request/></ProtectedRoute>}/>

          <Route path='/adminis' element={<ProtectedRoute><Admin/></ProtectedRoute>}/>
          <Route path='/notify' element={<Notification/>}/>
         
  
        </Routes>
            </div>
          </div>
          </div>
       
      </Router>
      </AuthProvider>
      </OfferProvider>
      </ProProvider>
      </CartProvider>
        </ProductProvider>
  
    )
  }
  export default App
    
    
  
  