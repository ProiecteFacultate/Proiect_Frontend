import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../css/PhotoPost.css'
import { firebaseStorage, firestore } from '../firebase';
import { collection, query, where, getDocs } from '@firebase/firestore'
import { getDownloadURL, getStorage, listAll, list, ref, uploadBytes, deleteObject } from "firebase/storage";
import { Button, TextField, Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { viewPhotoPost } from '../store/actions/action.ts';
import trash_icon from '../images/trash_icon.png';

function PhotoPost( {data} ) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const photoUrl = data.photoUrl;
  const photoOwnerTag = data.photoOwnerTag;

  const deletePhotoPost = () => {
    const photoUUID = extractPhotoUUIDFromPhotoUrl();
    const imageToDeleteRef = ref(firebaseStorage, `photos/` + photoOwnerTag + "/" + photoUUID);

    deleteObject(imageToDeleteRef)
        .then(() => {
          console.log("Deleted photo post");
        })
        .catch((e) => {
          console.log("Could not delete photo post " + e);
        });
  }

    const extractPhotoUUIDFromPhotoUrl = () => {
      const textAfter = "?alt=media";
      const UUIDlength = 36;

      const substringWhereUUIDisInTheEnd = photoUrl.substring(0, photoUrl.indexOf(textAfter));
      return substringWhereUUIDisInTheEnd.slice(-UUIDlength);
    }

    const viewPhotoPostInPanel = () => {
        let photoPayload = {
            photoUrl: photoUrl,
            photoOwnerTag: photoOwnerTag, 
            photoUUID: extractPhotoUUIDFromPhotoUrl()
        }
        dispatch(viewPhotoPost(photoPayload));
        navigate('/photo');
    }
  
    return (
      <>
        <div className='mainContainer'>
          <div className='photoAndDeleteIconContainer'>
            <img 
              src={photoUrl}
              alt="Photo"
              onClick={viewPhotoPostInPanel}
              style={{ cursor: 'pointer' }}
              className='photo'
            />
            <div className='deleteIconContainer'>
            <img 
              src={trash_icon}
              alt="Delete Icon"
              onClick={deletePhotoPost}
              style={{ cursor: 'pointer' }}
              className='deleteIcon'
            />
            </div>
          </div>
        </div>
      </>
    );
}
  
export default PhotoPost;