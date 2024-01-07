import React from 'react';
import '../css/AuthNavbar.css'

function AuthNavbar({ data }) {
    return <nav className='authNavbar'>
        <p>{data.navBarTitle}</p>
        <ul>
            <li>
                <a href='/authentication/register'>Register</a>
            </li>
            <li>
                <a href='/authentication/login'>Log In</a>
            </li>
        </ul>
    </nav>
}

export default AuthNavbar;