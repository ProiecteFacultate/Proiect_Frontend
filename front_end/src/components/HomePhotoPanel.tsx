import React, { useEffect, useState, useRef } from 'react';
import '../css/HomePhotoPanel.css'
import HomeNavbar from './HomeNavbar.tsx';
import PhotoPost from './PhotoPost.tsx';
import { firestore, firebaseStorage } from '../firebase.js';
import { getDownloadURL, getStorage, listAll, list, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, query, where, getDocs } from '@firebase/firestore'
import { v4 as uuidv4 } from 'uuid';
import { Button, TextField, Alert, AlertColor } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { visitProfile } from '../store/actions/action.ts';

function PhotoComment( {data} ) {
    
    return (
        <>
          <div className='homePhotoMainContainer'>
          <p>{data.ownerUsername}</p>
            <div className='homePhotoImageContainer'>
              <img 
                src={data.url}
                alt="Photo"
                className='homePhoto'
              />
            </div>
          </div>
        </>
    );
  }
    
export default PhotoComment;