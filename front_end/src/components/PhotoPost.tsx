import React from 'react';
import { useNavigate } from "react-router-dom";
import '../css/PhotoPost.css'
import { firebaseStorage, firestore } from '../firebase';
import { collection, query, where, getDocs, doc, deleteDoc } from '@firebase/firestore'
import { ref, deleteObject } from "firebase/storage";
import { useDispatch, useSelector } from 'react-redux';
import { viewPhotoPost } from '../store/actions/action.ts';
import trash_icon from '../images/trash_icon.png';

function PhotoPost( {data} ) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const photoUrl = data.photoUrl;
  const photoOwnerTag = data.photoOwnerTag;

  const userData = useSelector((state : any) => state.userData)
  const visitedProfileData = useSelector((state : any) => state.visitedProfileData)

  const deletePhotoPost = async () => {
    const photoUUID = extractPhotoUUIDFromPhotoUrl();
    const imageToDeleteRef = ref(firebaseStorage, `photos/` + photoOwnerTag + "/" + photoUUID);
    const photoInfoCollectionRef = collection(firestore, "PhotoInfo");
    const photoCommentsCollectionRef = collection(firestore, "PhotoComments");

    deleteObject(imageToDeleteRef)
        .then(async () => {
          const q = query(photoInfoCollectionRef, where("photoID", "==", photoUUID));
          const qSnap = await getDocs(q);
          const photoInfoDocToDeleteRef = doc(firestore, "PhotoInfo", qSnap.docs[0].id);
          await deleteDoc(photoInfoDocToDeleteRef);

          const q2 = query(photoCommentsCollectionRef, where("photoUUID", "==", photoUUID));
          const qSnap2 = await getDocs(q2);
          const photoCommentDocToDeleteRef = doc(firestore, "PhotoInfo", qSnap2.docs[0].id);
          await deleteDoc(photoCommentDocToDeleteRef);
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
            { userData.tag === visitedProfileData.tag &&
            <div className='deleteIconContainer'>
            <img 
              src={trash_icon}
              alt="Delete Icon"
              onClick={deletePhotoPost}
              style={{ cursor: 'pointer' }}
              className='deleteIcon'
            />
            </div>
            }
          </div>
        </div>
      </>
    );
}
  
export default PhotoPost;