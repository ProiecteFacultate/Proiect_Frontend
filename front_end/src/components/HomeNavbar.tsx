import React, { useState } from 'react';
import '../css/HomeNavbar.css'

function HomeNavbar({ data }) {
    return <nav className='homeNavbar'>
        <p>{data.navBarTitle}</p>
        <ul>
            <li>
                <a href='/profile'>My profile</a>
            </li>
            <li>
                <a href='/authentication/login'>Log out</a>
            </li>
        </ul>
    </nav>
}

export default HomeNavbar;