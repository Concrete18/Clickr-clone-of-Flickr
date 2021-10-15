import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from "../../store/comments";

import './CommentCreate.css';

function CommentCreate(photoId) {
  const sessionUser = useSelector(state => state.session.user);   
  const dispatch = useDispatch();
  
  const [commentBody, SetCommentBody] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      userId:sessionUser.id,
      photoId:photoId.photoId,
      commentBody
    }
    let createdComment = await dispatch(createComment(data))
    if (createdComment) return
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Write Comment
        <textarea
          type="text"
          onChange={(e) => SetCommentBody(e.target.value)}
          placeholder='Type Comment'
          required
        />
      </label>
      <button type="submit">Submit Comment</button>
    </form>
  );
}

export default CommentCreate;
