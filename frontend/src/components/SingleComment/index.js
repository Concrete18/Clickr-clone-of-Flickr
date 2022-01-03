import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

// stores
import { deleteComment, updateComment } from "../../store/comments";
import { getUserPhotos } from '../../store/photos';
import { getProfile } from '../../store/profile'
import { useHistory } from 'react-router-dom';

function SingleComment({comment}) {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
	const history = useHistory();
  const [commentBody, SetCommentBody] = useState("");
  const [showEditComment, setShowEditComment] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowEditComment(false)
		const data = commentBody
		let updatedComment = await dispatch(updateComment(data, comment.id))
    if (updatedComment) return
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setShowEditComment(false)
    let deletedComment = await dispatch(deleteComment(comment.id))
    if (deletedComment) return
  };

	const handleCancel = async (e) => {
    setShowEditComment(false)
  };

  const toProfile = async (e) => {
    e.preventDefault();
    await dispatch(getUserPhotos(comment?.User?.id))
    await dispatch(getProfile(comment?.User?.id))
    history.push(`/profile/${comment?.User?.id}`);
  }

	return (
		<div className='single_comment' key={`singleComment${comment.id}`}>
			<button className='username_link comment_username' onClick={toProfile}>{comment?.User?.username}</button>
			<p>{comment?.commentBody}</p>
			{sessionUser && sessionUser.id === comment.userId && !showEditComment && (
			<>
			<div className='update_delete_comment comment_buttons'>
				<button className='button' onClick={() => {setShowEditComment(true)}}>Edit</button>
				<button className='button' onClick={handleDelete}>Delete</button>
			</div>
			</>
			)}
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
						<button className='button' type="submit">Update</button>
						<button className='button' type="cancel" onClick={handleCancel}>Cancel</button>
					</div>
				</form>
			)}
		</div>
	);
}

export default SingleComment;
