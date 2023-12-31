import React, { useEffect, useState } from 'react';
import '../css/PhotoCommentsPanel.css'
import { firestore } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import { collection, query, where, getDocs, addDoc } from '@firebase/firestore'
import { Button, TextField } from '@mui/material';
import HomeNavbar from './HomeNavbar.tsx';
import PhotoComment from './PhotoComment.tsx';
import { useSelector } from 'react-redux';

function PhotoCommentsPanel() {
    const photoCommentsCollectionRef = collection(firestore, "PhotoComments");
    const usersCollectionRef = collection(firestore, "Users");

    const userData = useSelector((state : any) => state.userData)
    const photoData = useSelector((state : any) => state.viewedPhotoPostData)

    const [addedComment, setAddedComment] = useState('');
    const [addedSentComment, setAddedSentComment] = useState('');
    const [commentsToBeDisplayedList, setCommentsToBeDisplayedList] = useState<object[]>([]);
    
    const submitComment = (event : any) : void => {
        event.preventDefault();
        setAddedSentComment(addedComment);

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

    const retrieveComments = async () => {
        try {
          setCommentsToBeDisplayedList([])
          
          const q = query(photoCommentsCollectionRef, where("ownerTag", "==", photoData.photoOwnerTag), 
                           where("photoUUID", "==", photoData.photoUUID));
  
          const qSnap = await getDocs(q);
          const commentsList = await Promise.all(
            qSnap.docs.map(async (doc) => {

              const userQ = query(usersCollectionRef, where("tag", "==", photoData.photoOwnerTag));
              const userQsnap = await getDocs(userQ);

              let commentData = {
                commentText: doc.data().comment,
                commenterTag: doc.data().commenterTag,
                commenterUsername: userQsnap.docs[0].data().username,
                ownerTag: doc.data().ownerTag,
                photoUUID: doc.data().photoUUID
              }

              return commentData;
            })
          );

          setCommentsToBeDisplayedList(() => commentsList)
       
          console.log("Comments extracted")
        }
        catch(e) {
          console.log("Could not extract comment " + e)
        }  
      }

      useEffect( () => {
        retrieveComments();
      }, [addedSentComment]);  
    
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

            <div className='commentsDiv'>
            {
              commentsToBeDisplayedList.map(comment => (
                <PhotoComment key={uuidv4()}
                   data={{commentText: comment.commentText, commenterTag: comment.commenterTag, 
                 ownerTag: comment.ownerTag, commenterUsername: comment.commenterUsername, photoUUID:comment.photoUUID}}/>
              ))
            }
            </div>

            <form onSubmit={submitComment} className='addCommentForm'>
               <TextField className='hotoCommentTextField'
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
          
          </div>
        </>
    );
}
    
export default PhotoCommentsPanel;