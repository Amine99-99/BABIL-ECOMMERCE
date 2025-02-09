import React from 'react'
import {Link} from 'react-router-dom'


const Members=()=>{
    return(
        <div className='main-content'>
        <div className='member'>
            <div className='side'>
                <ul style={{listStyleType: 'none'}}>
                    <button className='btn-r'> <Link  style={{textDecoration:'none',color:'white'}}to='/adminis'> <li>Admin page</li></Link></button>
                    <button className='btn-r'><Link  style={{textDecoration:'none',color:'white'}} to='/users'><li>Members</li></Link></button>

                </ul>
                </div>
            <div className='my'>
                <h1 style={{borderBottom:'1px solid black'}}>Request Role</h1>
                
                <button className='btn-req'><Link style={{textDecoration:'none',color:'white'}} to='/request'>Role request</Link></button>
            </div>
            </div>
            </div>

        
    )

}
export default Members