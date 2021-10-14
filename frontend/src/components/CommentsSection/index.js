import React from "react";
import { useSelector } from 'react-redux';

import CommentCreate from '../CommentCreate';
import SingleComment from "../SingleComment";
import './CommentSection.css';

function CommentsSection({photoId}) {
  let comments = useSelector((state) => Object.values(state.comments));

  return (
    <div className='photo_comments'>
      <CommentCreate photoId={photoId} />
      <h2>Comments</h2>
      { comments?.map( comment => ( <SingleComment comment={comment} key={comment.id}/> ))}
    </div>
  );
}

export default CommentsSection;
