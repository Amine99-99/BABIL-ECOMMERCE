import React from 'react'


const Confirm =()=>{
    return(
        <div>
             template = {
    "text": f"Hello {new_user.name}, please confirm your account using this link: {token}",
    "html": f"<p>Hello {new_user.name},</p><p>Please confirm your account using this <a href='{token}'>link</a>.</p>"}

    send_email(to=new_user.email,subject='Confirm Your Account',template=template)

        </div>
    )
}

