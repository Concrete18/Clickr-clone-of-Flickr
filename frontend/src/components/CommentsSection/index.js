import React, { useState } from "react";
import { useSelector } from 'react-redux';

import CommentCreate from '../CommentCreate';
import SingleComment from "../SingleComment";
import './CommentSection.css';

function CommentsSection({photoId}) {
  let comments = useSelector((state) => state.comments?.[photoId]);

  return (
    <div className='photo_comments'>
      <CommentCreate photoId={photoId} />
      <h2>Comments</h2>
      { comments?.map( comment => ( <SingleComment comment={comment}/> ))}
    </div>
  );
}

export default CommentsSection;
