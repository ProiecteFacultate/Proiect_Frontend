import React, { useEffect, useState } from 'react';
import '../css/Profile.css'
import HomeNavbar from './HomeNavbar.tsx';
import { firestore, firebaseStorage } from '../firebase.js';
import { getDownloadURL, getStorage, listAll, list, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, query, where, getDocs } from '@firebase/firestore'
import { Button, TextField, Alert, AlertColor } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {  } from '../store/actions/action.ts';

function Profile() {
  const userData = useSelector((state : any) => state.userData)

  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [uploadedProfileImage, setUploadedProfileImage] = useState(null);

  useEffect( () => {
    const retrieveProfileImage = async () => {
      try {
        const profileImageRef = await ref(firebaseStorage, '/profileImages');

        const profileImagesList = await list(profileImageRef);
        console.log(profileImagesList.items.length)
        const profileImagesUrls = await Promise.all(
          profileImagesList.items.map((imgRef) => getDownloadURL(imgRef))
        );

        setProfileImageUrl(() => profileImagesUrls[0]);
      }
      catch(e) {
        console.log("Couldn't get profile image");
      }
    };

    retrieveProfileImage();
  }, []);

  const uploadProfileImage = () => {
    if(uploadedProfileImage == null) {
      return;
    }
    
    const profileImageRef = ref(firebaseStorage, 'profileImages/' + userData.username);

    uploadBytes(profileImageRef, uploadedProfileImage).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setProfileImageUrl(() => url);
      })
    })
  }

    return (
      <>
       <HomeNavbar data={{navBarTitle: "Profile Page"}}></HomeNavbar>
       <img
          src={profileImageUrl}
          className="img-fluid mt-3 rounded-circle"
          style={{ width: "100px", height: "100px" }}
          alt="Profile Image"
          />
       <div>
       <input
          type="file"
          onChange={(event) => setUploadedProfileImage(event.target.files[0])}
          className="form-control"
          />
          <Button onClick={uploadProfileImage}>Upload</Button>
       </div>
      </>
    );
}
  
export default Profile;