import {createBrowserRouter} from 'react-router-dom'
import Home from '../reactquery/home.js'
import Register from '../reactquery/register.js'

import Trend from '../reactquery/detail_.js'
import Products from '../reactquery/products.js'
import Detail from '../reactquery/detail.js'
import Login from '../reactquery/login.js'
import Profile from '../reactquery/profile.js'
import ProtectedRoute from '../reactquery/protected.js'
import Result from '../reactquery/result.js'
import Trade from '../reactquery/trade.js'
import Offer from '../reactquery/offer.js'


import Request from '../reactquery/request.js'
import Members from '../reactquery/members.js'

import Admin from '../reactquery/admin.js'
import Notification from '../reactquery/notification.js'
import MyOffer from '../reactquery/sell.js'
import Coming from '../reactquery/coming.js'



const router= createBrowserRouter([
    {
    path:'/',
    element:<Home/>,
    children:[
    
       
        {
            path:'trending/:fob',
            element:<Trend/>
        },
        {
            path:'product/:category',
            element:<Products/>

        },
        {
            path:'/product/:category/:fob',
            element:<Detail/>

        },
        {
            path:'/register',
            element:<Register/>
        },{
            path:'/login',
            element:<Login/>
        },{
            path:'/profile',
            element:(<ProtectedRoute><Profile/></ProtectedRoute>)
        },{
            path:'/search',
            element:<Result/>
        },{
            path:'/offer',
            element:<Offer/>
        },
        {
            path:'/trade',
            element:(<ProtectedRoute><Trade/></ProtectedRoute>)
        },
        {
            path:'/request',
            element:(<ProtectedRoute><Request/></ProtectedRoute>)
        },
        {
        path:'/adminis',
        element:(<ProtectedRoute><Admin/></ProtectedRoute>)
        },
        {
            path:'/notify',
            element:<Notification/>

        },{
            path:'/members',
            element:<Members/>
        },
        {
            path:'/myoffer',
            element:(<ProtectedRoute><MyOffer/></ProtectedRoute>)
        },{
        
                path:'/coming',
                element:(<ProtectedRoute><Coming/></ProtectedRoute>)
        
    
        }

        
    ]
},

    
    
])
export default router