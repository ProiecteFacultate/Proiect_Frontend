import React from 'react';
import '../css/PhotoComment.css'

function PhotoComment( {data} ) {
    const commentText = data.commentText;
    const commenterUsername = data.commenterUsername;
    
    return (
        <>
          <div className='photoCommentMainDiv'>
            <p className='commenterUsernameP'>{commenterUsername}</p>
            <p className='commentTextP'>{commentText}</p>
            <hr className='photoPostHr'></hr>
          </div>
        </>
    );
  }
    
export default PhotoComment;