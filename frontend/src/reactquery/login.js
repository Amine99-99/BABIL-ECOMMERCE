import React, { useState } from 'react';
import {Link ,useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth.js'


const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [success,setSuccess] = useState(null)
  const [error,setError] = useState(null)
  const navigate=useNavigate()
  const {setIsAuthenticated} = useAuth()
  
  
 
 

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await fetch('/login',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          email:form.email,
          password:form.password
        })
  
      })
      const result = await response.json()
      if(response.ok){
        setSuccess(result.message)
        setError(null)
        setIsAuthenticated(true)
        navigate('/profile')
  
      }else{
        setError(result.error?Object.values(result.error).flat().join(', '):result.message)
        setSuccess(null)
      }
      
    }catch(err){
      setSuccess(null)
      setError('wrong')
    }
    

   
  };

  return (
    <div className='main-content' >
      <div className='form-login'>
      <h2>Login</h2>
      {success && <p>{typeof success === 'string' ? success : JSON.stringify(success)}</p>}
      {error && <p>{typeof error==='string' ? error:JSON.stringify(error)}</p>}
      
   
    

      <form className='login' onSubmit={handleSubmit}>
        <div className='input-login'>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={form.email}
          onChange={handleChange}
          className='control-log'
        />
        </div>
        <div className='input-login'>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={form.password}
          onChange={handleChange}
          className='control-log'
        />
        </div>
        <button className='btn-log' type="submit">Login</button>
      </form>
       <Link style={{textDecoration:'none',marginTop:'-35px'}} to='/register'>Register</Link>
       </div>
    </div>
  );
};

export default Login;
