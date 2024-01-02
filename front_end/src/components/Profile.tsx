import React, { useState } from 'react';
import '../css/Profile.css'
import HomeNavbar from './HomeNavbar.tsx';
import { firestore } from '../firebase.js';
import { addDoc, collection, query, where, getDocs } from '@firebase/firestore'
import { Button, TextField, Alert, AlertColor } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {  } from '../store/actions/action.ts';

function Profile() {
  const userData = useSelector((state : any) => state.userData)
  console.log("Profile")
  console.log(userData)
    return (
      <>
       <HomeNavbar data={{navBarTitle: "Profile Page"}}></HomeNavbar>

      </>
    );
}
  
export default Profile;