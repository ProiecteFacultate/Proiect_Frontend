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
import { useNavigate } from 'react-router-dom';
import { viewPhotoPost } from '../store/actions/action.ts';

function PhotoComment( {data} ) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const viewPhotoPostInPanel = () => {
    let photoPayload = {
        photoUrl: data.url,
        photoOwnerTag: data.ownerTag, 
        photoUUID: data.photoUUID
    }
    dispatch(viewPhotoPost(photoPayload));
    navigate('/photo');
  }

  const onVisitProfileClick = () => {
    let visitProfilePayload = {
        username: data.ownerUsername,
        tag: data.ownerTag
    }

    dispatch(visitProfile(visitProfilePayload));
  }
    
    return (
        <>
          <div className='homePhotoMainContainer'>
          <p className='ownerUsernameP'>{data.ownerUsername} &nbsp;&nbsp;
            <a href='/profile' className='viewProfileLink' 
               onClick={onVisitProfileClick}
               style={{ cursor: 'pointer' }}>
              View Profile
            </a>
          </p>
          
            <div className='homePhotoImageContainer'>
              <img 
                src={data.url}
                alt="Photo"
                onClick={viewPhotoPostInPanel}
                style={{ cursor: 'pointer' }}
                className='homePhoto'
              />
            </div>
      
            <hr className='homePhotoHr'></hr>
          </div>
        </>
    );
  }
    
export default PhotoComment;