import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../css/PhotoComment.css'
import { firebaseStorage, firestore } from '../firebase';
import { collection, query, where, getDocs } from '@firebase/firestore'
import { getDownloadURL, getStorage, listAll, list, ref, uploadBytes, deleteObject } from "firebase/storage";
import { Button, TextField, Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logInUser } from '../store/actions/action.ts';

function PhotoComment( {data} ) {
    const photoUrl = data.photoUrl;
    const photoOwnerTag = data.photoOwnerTag;
  
    const deletePhotoPost = () => {
    
      return (
        <>
        </>
      );
  }
}
    
export default PhotoComment;