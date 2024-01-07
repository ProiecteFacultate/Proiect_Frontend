import React, { useEffect, useState } from 'react';
import '../css/Home.css';
import HomeNavbar from './HomeNavbar.tsx';
import HomePhotoPanel from './HomePhotoPanel.tsx';
import { firestore, firebaseStorage } from '../firebase.js';
import { addDoc, collection, query, where, getDocs } from '@firebase/firestore';
import { getDownloadURL, getStorage, listAll, list, ref, uploadBytes } from "firebase/storage";
import { Button, TextField, Alert, AlertColor } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {  } from '../store/actions/action.ts';

function HomePage() {
  const photoInfoCollectionRef = collection(firestore, "PhotoInfo");
  const defaultMaxNumberOfExtractedPhotos = 5;

  const [photosCompleteInfo, setPhotosCompletInfo] = useState<object[]>([])

  const retrieveRandomPhotosWithProfileInfo = async () => {
    const q = query(photoInfoCollectionRef);
    const qSnap = await getDocs(q);
    const photoInfoIndexes = getRandomNumbers(qSnap.size - 1);

    let photosInfo : object[] = []

    for(let i = 0; i < photoInfoIndexes.length; i++) {
      let index = photoInfoIndexes[i];
      let info = {
        url: qSnap.docs[index].data().url,
        ownerTag: qSnap.docs[index].data().ownerTag,
        ownerUsername: qSnap.docs[index].data().ownerUsername,
        photoUUID: qSnap.docs[index].data().photoID
      }
      photosInfo = [...photosInfo, info];
    }

    setPhotosCompletInfo(() => photosInfo);
  }

  function getRandomNumbers(max) {
    let availableNumbers : number[] = []
    for(let i = 0; i <= max; i++) {
      availableNumbers.push(i);
    }
    
    if (defaultMaxNumberOfExtractedPhotos > max) {
      return availableNumbers;
    }
  
    let result : number[] = [];
  
    for (let i = 0; i < defaultMaxNumberOfExtractedPhotos; i++) {
      const randomIndex = Math.floor(Math.random() * availableNumbers.length);
      result = [...result, availableNumbers[randomIndex]];
      availableNumbers.splice(randomIndex, 1);
    }
  
    return result;
  }

  useEffect( () => {
    retrieveRandomPhotosWithProfileInfo();
    console.log("Retrieved photos for home page")
  }, []);

    return (
      <>
       <HomeNavbar data={{navBarTitle: "Home Page"}}></HomeNavbar>
       
       <div className='homeMainContainer'>
          {
              photosCompleteInfo.map(photoData => (
                <HomePhotoPanel key={photoData.url} data={{url: photoData.url, ownerUsername: photoData.ownerUsername,
                                photoUUID: photoData.photoUUID, ownerTag: photoData.ownerTag}}/>
              ))
          }
       </div>
      </>
    );
}
  
export default HomePage;