import React ,{useEffect,useState} from 'react'
import Logout from './logout.js'
import '../account.css'
import Family from './family.js'



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
    
        getProfile(); // Invoke the function
    }, []);
    
    
    


    return(
        <div className='container'>
            <div className='pro'>
            {error && <p>{typeof error==='string' ? error:JSON.stringify(error)}</p>}
            <div className='top'>
            
            <p>{data.id}</p>
            <p>{data.name}</p>
            <p>{data.email}</p>
            <p>{data.role}<i class="fa-solid fa-user"></i></p>
            
            </div>
            <Logout/>

            </div>
            <div className='my-profile'>
                <Family/>
            </div>
        </div>
    )
}
export default Profile