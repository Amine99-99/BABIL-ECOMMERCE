import React from 'react'
const Search=({onChange,value,onClick})=>{
  return(

  <div className='search'>
    <input type='text' className='search-1' onChange={onChange} value={value} />

    <button style={{ height:'2.5rem',padding:'0.5rem',borderRadius:'2px',border:'none',backgroundColor:'black',color:'white',fontWeight:'bold'}} onClick={onClick}>Search</button>
    </div>

    )
}
export default Search