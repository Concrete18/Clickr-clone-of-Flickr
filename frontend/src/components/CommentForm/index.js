import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { Redirect } from "react-router-dom";
// import * as sessionActions from "../../store/session";
import './CommentForm.css';

function CommentForm() {
  const dispatch = useDispatch();
  
  const [commentBody, SetCommentBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(commentBody)
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

export default CommentForm;
