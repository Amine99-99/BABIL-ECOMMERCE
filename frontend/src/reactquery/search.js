import React from 'react'
const Search=({onChange,value,onClick})=>{
  return(

  <div className='search'>
    <input type='text' className='search-1' placeholder='Search Babil...' onChange={onChange} value={value} />

    <button className='log-1'  onClick={onClick}><i class="fas fa-search"></i>
    </button>
    </div>

    )
}
export default Search