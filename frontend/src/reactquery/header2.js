import React from 'react'
import {Link} from 'react-router-dom'


const HeaderTwo=()=>{
    return(
    
            <ul className='list-1' >
                
                <li className='lin'><Link to='/trade' style={{textDecoration:'none',color:'white'}}>Sell</Link></li>
                <li className='lin'><Link to='/offer' style={{textDecoration:'none',color:'white'}}>My Product</Link></li>
                <li className='lin'><Link style={{textDecoration:'none',color:'white'}}>Realtor</Link></li>
                <li className='lin'><Link style={{textDecoration:'none',color:'white'}}>Export/Import</Link></li>
                <li className='lin'><Link style={{textDecoration:'none',color:'white'}}>Farmers</Link></li>
                <li className='lin'><Link style={{textDecoration:'none',color:'white'}}>Used Cars</Link></li>
            </ul>
        
    )
}
export default HeaderTwo