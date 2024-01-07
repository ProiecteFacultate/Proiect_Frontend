import React from 'react';
import '../css/HomeNavbar.css'
import { useSelector, useDispatch } from 'react-redux';
import { visitProfile } from '../store/actions/action.ts';

function HomeNavbar({ data }) {
    const dispatch = useDispatch();
    
    const userData = useSelector((state : any) => state.userData);

    const onProfileButtonClick = () => {
        let visitProfilePayload = {
            username: userData.username,
            tag: userData.tag
        }

        dispatch(visitProfile(visitProfilePayload));
    }
    
    return <nav className='homeNavbar'>
        <p>{data.navBarTitle}</p>
        <ul>
            <li>
                <a href='/home'>Home</a>
            </li>
            <li>
                <a href='/profile' onClick={onProfileButtonClick}>My profile</a>
            </li>
            <li>
                <a href='/authentication/login'>Log out</a>
            </li>
        </ul>
    </nav>
}

export default HomeNavbar;