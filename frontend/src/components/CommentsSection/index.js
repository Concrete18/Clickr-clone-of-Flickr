import React from "react";
import { useSelector } from 'react-redux';

import CommentCreate from '../CommentCreate';
import SingleComment from "../SingleComment";
import './CommentSection.css';

function CommentsSection({photoId}) {
  const sessionUser = useSelector(state => state.session.user);
  let comments = useSelector((state) => Object.values(state.comments));

  return (
    <div className='photo_comments'>
      {sessionUser && <CommentCreate photoId={photoId} /> }
      
      <h2>Comments</h2>
      {/* TODO show no comments message if non exist */}
      {comments && <h3>No Comments</h3>}
      { comments?.map( comment => ( <SingleComment comment={comment} key={comment.id}/> ))}
    </div>
  );
}

export default CommentsSection;
