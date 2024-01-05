import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../css/PhotoCommentsPanel.css'
import { firebaseStorage, firestore } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import { collection, query, where, getDocs, addDoc } from '@firebase/firestore'
import { getDownloadURL, getStorage, listAll, list, ref, uploadBytes, deleteObject } from "firebase/storage";
import { Button, TextField, Alert } from '@mui/material';
import HomeNavbar from './HomeNavbar.tsx';
import PhotoComment from './PhotoComment.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { logInUser } from '../store/actions/action.ts';


function PhotoCommentsPanel() {
    const photoCommentsCollectionRef = collection(firestore, "PhotoComments");
    const usersCollectionRef = collection(firestore, "Users");

    const userData = useSelector((state : any) => state.userData)
    const photoData = useSelector((state : any) => state.viewedPhotoPostData)

    const [addedComment, setAddedComment] = useState('');
    const [commentsList, setCommentsList] = useState<object[]>([]);
    
    const submitComment = (event : any) : void => {
        event.preventDefault();

        try {
            let commentData = {
                comment: addedComment,
                commenterTag: userData.tag,
                ownerTag: photoData.photoOwnerTag,
                photoUUID: photoData.photoUUID
            };

            addDoc(photoCommentsCollectionRef, commentData);
            console.log("Comment added")
        }
        catch(e) {
            console.log("Could not add comment")
        }
        
        setAddedComment(() => '')
    }

    const retrieveComments = () => {
        try {
          setCommentsList(() => [])
    
          const q = query(photoCommentsCollectionRef, where("ownerTag", "==", photoData.photoOwnerTag), 
                           where("photoUUID", "==", photoData.photoUUID));
  
          getDocs(q).then((qSnap) => { 
            qSnap.docs.forEach((doc) => {

                const userQ = query(usersCollectionRef, where("tag", "==", photoData.photoOwnerTag));
                getDocs(userQ).then((userQsnap) => {
         
                    let commentData = {
                        commentText: doc.data().comment,
                        commenterTag: doc.data().commenterTag,
                        commenterUsername: userQsnap.docs[0].data().username,
                        ownerTag: doc.data().ownerTag,
                        photoUUID: doc.data().photoUUID
                    }
  
                    setCommentsList((prev) => [...prev, commentData]);
                })   
            })
          });

          console.log("Comments extracted")
        }
        catch(e) {
          console.log("Could not extract comment " + e)
        }  
      }

      useEffect( () => {
        retrieveComments();
      }, [addedComment]);  
    
    return (
        <>
        <HomeNavbar data={{navBarTitle: "Photo Post"}}></HomeNavbar>
          <div className='mainContainerDiv'>

            <div className='photoContainer'>
              <img 
                src={photoData.photoUrl}
                className='photo'
              />
            </div>

            <form onSubmit={submitComment} className='addCommentForm'>
               <TextField className='textField'
                 label="Your comment"
                 onChange={(event : any) => setAddedComment( () => event.target.value)}
                 value={addedComment}
                 required
                 variant="outlined"
                 type="text"
                 sx={{mb : 3}}
               />

              <Button type="submit" variant="outlined" color="secondary" className="addCommentButton">Add</Button>
            </form>

            <div className='commentsDiv'>
            {
              commentsList.map(comment => (
                <PhotoComment key={uuidv4()}
                   data={{commentText: comment.commentText, commenterTag: comment.commenterTag, 
                 ownerTag: comment.ownerTag, commenterUsername: comment.commenterUsername, photoUUID:comment.photoUUID}}/>
              ))
            }
            </div>
          
          </div>
        </>
    );
}
    
export default PhotoCommentsPanel;