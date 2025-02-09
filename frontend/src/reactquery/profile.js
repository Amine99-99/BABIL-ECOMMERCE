import React ,{useEffect,useState} from 'react'

import '../account.css'
import Family from './family.js'
import Order from './order.js'
import Payment from './payment.js'
import Saving from './savings.js'
import Security from './security.js'
import Address from './addresses.js'
import My from './my.js'



const Profile=()=>{
    const [data,setData] = useState({
        id:'',
        name:'',
        email:'',
        role:''
    })
    const [error,setError]=useState(null)
    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await fetch('/user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        
                    },
                });
    
                const data = await response.json();
                if (response.ok) {
                    setData({
                        id: data.id,
                        name: data.name,
                        email: data.email,
                        role:data.role
                    });
                    setError(null);
                } else {
                    setData({});
                    setError(Object.values(data.error || {}).flat().join(', ') || 'Error retrieving profile.');
                }
            } catch (err) {
                setData({});
                setError('No profile data available.');
            }
        };
    
        getProfile(); 
    }, []);
    
    
    


    return(
        <div className='main-content'>
            <div className='pop'>
            <h1>Your Account</h1>
            <div className='pro'>
           
            
           

           
           
                <Order/>
                <Family/>
                <Payment/>
                <Saving/>
                <Security/>
                <Address/>
                <My/>
            
            </div>
            <div>
            {error && <p>{typeof error==='string' ? error:JSON.stringify(error)}</p>}
            <p>{data.email}</p>
            <p>{data.role}</p>
            </div>
            </div>
        </div>
    )
}
export default Profile