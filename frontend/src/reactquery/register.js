import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'

const Register = () => {
  const [form,setForm] =useState({
    username:'',
    email:'',
    password:'',
    confirm_password:'',
    address:'',
    postal_code:'',
    phone:''
})
 
  
  const [error, setError] = useState(null);
  const [success,setSuccess] =useState(null)
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const validate = () => {
    let newErr = {};
    let isValid = true;
    const special_char = '@§$/\\(){}#*';

    if (form.name.trim() === '') {
      newErr.name = 'Enter your name';
      isValid = false;
    }

    if (form.email.trim() === '' || !form.email.includes('@')) {
      newErr.email = 'Enter a valid email that includes @';
      isValid = false;
    }

    if (form.password.length < 9) {
      newErr.password = 'Password is too short';
      isValid = false;
    } else {
      let countSpecial = 0;
      let countUpper = 0;
      let countLower = 0;
      let countDigit = 0;

      for (let i = 0; i < form.password.length; i++) {
        let char = form.password[i];
        if (char === char.toLowerCase()) {
          countLower++;
        }
        if (char === char.toUpperCase()) {
          countUpper++;
        }
        if (/\d/.test(char)) {
          countDigit++;
        }
        if (special_char.includes(char)) {
          countSpecial++;
        }
      }

      if (countSpecial === 0 || countDigit === 0 || countUpper === 0 || countLower === 0) {
        newErr.password =
          'Password must include at least one special character, one digit, one uppercase letter, and one lowercase letter';
        isValid = false;
      }
    }

    if (form.confirm_password !== form.password) {
      newErr.confirm_password = 'Passwords must match';
      isValid = false;
    }

    setError(newErr);
    return isValid;
  };

  const reset = () => {
    setForm({
      name: '',
      email: '',
      password: '',
      confirm_password: '',
      address:'',
      postal_code:'',
      phone:''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      reset();
    }
    try{
      const response =  await fetch('/register',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          name:form.name,
          email:form.email,
          password:form.password,
          confirm_password:form.confirm_password
         })


      })
      const result = await response.json()
      if(result.message){
        setSuccess(result.message)
        setError(null)
        navigate('/login')

      }else{
        setSuccess(null)
        setError(result.error?Object.values(result.error).flat().join(', '):result.message)
    }
      
      

      
    }catch(err){
      setSuccess(null)
      setError('wrong')

    }
  }
  

  return (
    <div className='main-content' >
      
     {success && <p>{typeof success === 'string' ? success : JSON.stringify(success)}</p>}
      {error && <p>{typeof error==='string' ? error:JSON.stringify(error)}</p>}
      <div className='form-register'>
        <h2>Sign up</h2>
      <form className='register' onSubmit={handleSubmit}>
    <div className='group'>
    <label htmlFor='name'>Username</label>
    <input
      type="text"
      id="name"
      value={form.name}
      onChange={handleChange}
      placeholder="Name"
      className='control'
    />
  </div>

  <div className='group'>
    <label htmlFor='email'>Email</label>
    <input
      type="email"
      id="email"
      value={form.email}
      onChange={handleChange}
      placeholder="Email"
      className='control'
    />
  </div>

  <div className='group'>
    <label htmlFor='password'>Password</label>
    <input
      type="password"
      id="password"
      value={form.password}
      onChange={handleChange}
      placeholder="Password"
      className='control'
    />
  </div>

  <div className='group'>
    <label htmlFor='confirm_password'>Confirm Password</label>
    <input
      type="password"
      id="confirm_password"
      value={form.confirm_password}
      onChange={handleChange}
      placeholder="Confirm Password"
      className='control'
    />
  </div>

  <div className='group'>
    <label htmlFor='address'>Address</label>
    <input
      type='text'
      id='address'
      onChange={handleChange}
      value={form.address}
      className='control'
    />
  </div>

  <div className='group'>
    <label htmlFor='code'>Post Code</label>
    <input
      type='number'
      id='code'
      onChange={handleChange}
      value={form.postal_code}
      className='control'
    />
  </div>

  <div className='group'>
    <label htmlFor='phone'>Phone Number</label>
    <input
      type='tel'
      id='phone'
      onChange={handleChange}
      value={form.phone}
      className='control'
    />
  </div>

  <button type="submit" className='btn-reg'>Register</button>
</form>

      
      </div>
    </div>
  );
};

export default Register;
