import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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

	const handleCancel = async (e) => {
    setShowEditComment(!showEditComment)
  };

	return (
		<div className='single_comment' key={comment.id}>
			{sessionUser && sessionUser.id === comment.userId && !showEditComment && (
				<>
				<div className='update_delete_comment comment_buttons'>
					<button onClick={() => {setShowEditComment(!showEditComment)}}>Edit</button>
					<button onClick={handleDelete}>Delete</button>
				</div>
				</>
				)}
			<Link to={`/profile/${comment?.User?.id}`} className='username_link'>
				<h3>{comment?.User?.username}</h3>
			</Link>
      <p>{comment?.commentBody}</p>
			{sessionUser && sessionUser.id === comment.userId && showEditComment && (
				<form className='edit_comment_form' onSubmit={handleSubmit}>
					<textarea
						type="text"
						onChange={(e) => SetCommentBody(e.target.value)}
						placeholder='Type Comment'
						defaultValue={comment?.commentBody}
						required
					/>
					<div className='submit_update_cancel_comment comment_buttons'>
						<button type="submit">Update</button>
						<button type="cancel" onClick={handleCancel}>Cancel</button>
					</div>
				</form>
			)}
		</div>
	);
}

export default SingleComment;
