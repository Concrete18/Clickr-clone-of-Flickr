import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, updateComment } from "../../store/comments";

import './SingleComment.css';

function SingleComment({comment}) {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [commentBody, SetCommentBody] = useState("");
  const [commentId, SetCommentId] = useState(comment.id);
  const [showEditComment, setShowEditComment] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowEditComment(!showEditComment)
		const data = commentBody
		let updatedComment = await dispatch(updateComment(data, commentId))
    if (updatedComment) return
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setShowEditComment(!showEditComment)
    let deletedComment = await dispatch(deleteComment(commentId))
    if (deletedComment) return
  };

	return (
		<div className='single_comment' key={comment.id}>
			{sessionUser.id === 1 && !showEditComment && (
				<>
					<button onClick={() => {setShowEditComment(!showEditComment)}}>Edit Comment</button>
					<button onClick={handleDelete}>Delete Comment</button>
				</>
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
						value={commentBody}
						required
					/>
					</label>
					<button type="submit">Update Comment</button>
				</form>
			)}
		</div>
	);
}

export default SingleComment;
