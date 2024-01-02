import React, { useState } from 'react';
import '../css/Home.css';
import HomeNavbar from './HomeNavbar.tsx';
import { firestore } from '../firebase.js';
import { addDoc, collection, query, where, getDocs } from '@firebase/firestore';
import { Button, TextField, Alert, AlertColor } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {  } from '../store/actions/action.ts';

function HomePage() {
  const userData = useSelector((state : any) => state.userData)
  console.log("HOME")
  console.log(userData)
    return (
      <>
       <HomeNavbar data={{navBarTitle: "Home Page"}}></HomeNavbar>

      </>
    );
}
  
export default HomePage;