import React, { useEffect, useState, useRef } from 'react';
import '../css/Profile.css'
import HomeNavbar from './HomeNavbar.tsx';
import PhotoPost from './PhotoPost.tsx';
import { firestore, firebaseStorage } from '../firebase.js';
import { getDownloadURL, getStorage, listAll, list, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, query, where, getDocs } from '@firebase/firestore'
import { v4 as uuidv4 } from 'uuid';
import { Button, TextField, Alert, AlertColor } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { visitProfile } from '../store/actions/action.ts';
import default_profile_image from '../images/default_profile_image.png';
import camera_icon from '../images/camera_icon.png';

function Profile() {
  const fileInputRef = useRef(null);
  const userData = useSelector((state : any) => state.userData)
  const visitedProfileData = useSelector((state : any) => state.userData)

  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [profileUsername, setProfileUsername] = useState("");
  const [profileDescription, setProfileDescription] = useState("");
  const [photosUrls, setPhotosUrls] = useState<any>([])

  const retrieveProfileInfo = async () => {
    const profilesCollectionRef = collection(firestore, "Profiles");
    try {
      const q = query(profilesCollectionRef, where("tag", "==", visitedProfileData.tag));
      getDocs(q).then((qSnap) => { 
        setProfileUsername(() => qSnap.docs[0].data().username)
        setProfileDescription(() => qSnap.docs[0].data().description)
      });

      // console.log("Retrieved profile Info")
    }
    catch(e) {
      console.log('Failed to retrieve profile data' + e);
    }
  }

  const retrieveProfileImage = async () => {
    try {
      const profileImageRef = await ref(firebaseStorage, '/profileImages/' + visitedProfileData.tag + '/');
      const profileImagesList = await list(profileImageRef);
      const profileImagesUrlList = await Promise.all(
        profileImagesList.items.map((imgRef) => getDownloadURL(imgRef))
      );

      if(profileImagesList.items.length === 0) {
        setProfileImageUrl(() => default_profile_image);
      }
      else {
        setProfileImageUrl(() => profileImagesUrlList[0]);
      }

      // console.log("Retrieved profile image");
      
    }
    catch(e) {
      console.log("Couldn't get profile image" + e);
    }
  };

  const retrievePhotoPosts = async () => {
    try {
      const photosRef = await ref(firebaseStorage, '/photos/' + visitedProfileData.tag + '/');
      const photosList = await list(photosRef);
      const photosUrlList = await Promise.all(
        photosList.items.map((imgRef) => getDownloadURL(imgRef))
      );

      setPhotosUrls(() => photosUrlList) 
      // console.log("Retrieved photo posts")
    }
    catch(e) {
      console.log("Couldn't get phtos" + e);
    }
  };


  useEffect( () => {
    const interval = setInterval(retrieveProfileImage, 3000);
    return () => clearInterval(interval);
  }, [profileImageUrl]);

  useEffect( () => {
    const interval = setInterval(retrieveProfileInfo, 3000);
    return () => clearInterval(interval);
  } )

  useEffect( () => {
    const interval = setInterval(retrievePhotoPosts, 3000);
    return () => clearInterval(interval);
  } )

  const uploadProfileButtonClick = () => {
    fileInputRef.current.click();
  }

  const uploadProfileImage = (imageToUpload) => {
    if(imageToUpload == null) {
      return;
    }
    
    const profileImageRef = ref(firebaseStorage, 'profileImages/' + userData.tag + "/" + userData.username);

    uploadBytes(profileImageRef, imageToUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setProfileImageUrl(() => url);
      })
    })
  }

  const uploadPhoto = (photoToUpload) => {
    if(photoToUpload == null) {
      return;
    }
    
    const photoId = uuidv4();
    const photosRef = ref(firebaseStorage, 'photos/' + userData.tag + "/" + photoId);

    uploadBytes(photosRef, photoToUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
       // setProfileImageUrl(() => url);
      })
    })
  }

    return (
      <>
       <HomeNavbar data={{navBarTitle: "Profile Page"}}></HomeNavbar>
       <div className='mainDiv'>


        <div className='profileImageAndCameraContainer'>
          <div className='profileImageContainer'>
            <img
              src={profileImageUrl}
              className='profileImage'
              alt="Profile Image"
            />
          </div>
          <div className='cameraIconContainer'>
            <input
              type="file"
              onChange={(event) => uploadProfileImage(event.target.files[0])}
              style={{ display: 'none' }}
              ref={fileInputRef}
            />
            <img
              src={camera_icon}
              className='cameraIconImage'
              alt="Camera Icon"
              onClick={uploadProfileButtonClick}
              style={{ cursor: 'pointer' }}
            />
          </div>
        </div>


        <div className='profileInfoContainer'>
          <p className='usernameText'>{profileUsername}</p>
          <p className='descriptionText'>{profileDescription}</p>
        </div>


        <div className='photosPostsContainer'>
          <input
              type="file"
              onChange={(event) => uploadPhoto(event.target.files[0])}
          />

          <div className='photosPostsFrame'>  
            {
              photosUrls.map(url => (
                <PhotoPost key={url} data={{photoUrl: url, photoOwnerTag: visitedProfileData.tag}}/>
              ))
            }
          </div>
        </div>
       </div>
      </>
    );
}
  
export default Profile;