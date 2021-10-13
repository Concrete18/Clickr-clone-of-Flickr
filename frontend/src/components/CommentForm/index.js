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

  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Write Comment
        <input
          type="text"
          value='{confirmPassword}'
          onChange={(e) => SetCommentBody(e.target.value)}
          required
        />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default CommentForm;
