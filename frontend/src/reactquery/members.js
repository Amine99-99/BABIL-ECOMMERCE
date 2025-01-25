import React from 'react'
import {Link} from 'react-router-dom'


const Members=()=>{
    return(
        <div classname='container'>
            <div className='side'>
                <ul>
                    <Link to='/adminis'> <li>Admin page</li></Link>
                    <Link to='/users'><li>Members</li></Link>

                </ul>
                </div>
            <div className='my'>
                <h1>My Profile</h1>
                <p>Request</p>
                <button><Link to='/request'>Role request</Link></button>
            </div>
            </div>

        
    )

}
export default Members