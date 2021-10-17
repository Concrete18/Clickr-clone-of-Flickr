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
      {!(Object.values(comments).length) && <h3>No Comments</h3>}
      <div className='all_comments'>
        {comments && comments?.map( comment => ( <SingleComment comment={comment} key={`comments${comment.id}`}/> ))}
      </div>
    </div>
  );
}

export default CommentsSection;
