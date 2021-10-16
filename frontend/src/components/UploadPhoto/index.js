import React, { useEffect, useState } from 'react';
// import * as sessionActions from '../../store/session';
import { useSelector, useDispatch } from 'react-redux';
import { uploadNewPhoto } from "../../store/photos";
import { useParams } from 'react-router-dom';
// import './home.css';

function UploadPhoto() {
  const sessionUser = useSelector(state => state.session.user);
	const { userId } = useParams();
	const dispatch = useDispatch();

	const [showUploadForm, setShowUploadForm] = useState(false);
	const [showFormButton, setShowFormButton] = useState(false);
	const [photoTitle, setPhotoTitle] = useState('')
	const [photoDescription, setDescription] = useState('')
	const [photoImageUrl, setPhotoImageUrl] = useState('')

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = {
			userId:userId,
			albumId:1,
			title:photoTitle,
			description:photoDescription,
			imgUrl:photoImageUrl
		}
		let createdPhoto = await dispatch(uploadNewPhoto(data))
		if (createdPhoto) return
	};

	useEffect(() => {
		if (sessionUser.id == userId) setShowFormButton(true);
		else setShowFormButton(false)
	}, [dispatch, userId, sessionUser.id])

  return (
		<div className='upload_form'>
		{showFormButton && (
			<div className='show_photo_upload_button'>
				<button onClick={() => {setShowUploadForm(!showUploadForm)}} className='upload_button'>Show Upload Photo</button>
			</div>
		)}
		{showUploadForm && (
		<form onSubmit={handleSubmit} className='upload_photo_form'>
			<div className='upload_photo_inputs'>
				<label>Title
					<input type="text" onChange={(e) => setPhotoTitle(e.target.value)} placeholder='Type title' required />
				</label>
				<label>Description
					<input type="text" onChange={(e) => setDescription(e.target.value)} placeholder='Type description' required />
				</label>
				<label>Image URL
					<input type="text" onChange={(e) => setPhotoImageUrl(e.target.value)} placeholder='Type image url' required />
				</label>
			</div>
			<div className='upload_photo_button'>
				<button type="submit">Upload</button>
			</div>
		</form>
		)}
			</div>
		);
}

export default UploadPhoto;
