import React, { useState } from "react";
import { useSelector } from 'react-redux';

import CommentForm from '../../components/CommentForm';
import './CommentSection.css';

function CommentSection({comments, photoId}) {
  const sessionUser = useSelector(state => state.session.user);
  const [commentBody, SetCommentBody] = useState("");
  const [showEditComment, setShowEditComment] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(commentBody)
    setShowEditComment(!showEditComment)
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setShowEditComment(!showEditComment)
    console.log(commentBody)
  };

  return (
    <div className='photo_comments'>
      <CommentForm photoId={photoId} />
      <h2>Comments</h2>
      { comments?.map( comment => {
        return (
          <div className='single_comment' key={comment.id}>
            {sessionUser.id === 1 && !showEditComment && (
              <button onClick={() => {setShowEditComment(!showEditComment)}}>Edit Comment</button>
            )}
            <h3>{comment.User.username}.</h3>
            <p>{comment.commentBody}</p>
            {sessionUser.id === 1 && showEditComment && (
              <form onSubmit={handleSubmit}>
                <label>
                Edit Comment
                <textarea
                  type="text"
                  onChange={(e) => SetCommentBody(e.target.value)}
                  placeholder='Type Comment'
                  value={comment.commentBody}
                  required
                />
                </label>
                <button type="submit">Update Comment</button>
                <button onClick={handleDelete}>Delete Comment</button>
              </form>
            )}
          </div>
      )
      })}
    </div>
  );
}

export default CommentSection;
