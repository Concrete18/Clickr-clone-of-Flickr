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
		if (+sessionUser.id == +userId) setShowFormButton(true);
		else setShowFormButton(false)
  }, [dispatch, userId])

  return (
		<div className='upload_form'>
		{showFormButton && (
			<button onClick={() => {setShowUploadForm(!showUploadForm)}}>Show Upload Photo</button>
		)}
		{showUploadForm && (
		<form onSubmit={handleSubmit}>
			<label>Title
				<input type="text" onChange={(e) => setPhotoTitle(e.target.value)} placeholder='Type title' required />
			</label>
			<label>Description
				<input type="text" onChange={(e) => setDescription(e.target.value)} placeholder='Type description' required />
			</label>
			<label>Image URL
				<input type="text" onChange={(e) => setPhotoImageUrl(e.target.value)} placeholder='Type image url' required />
			</label>
			<button type="submit">Upload</button>
		</form>
		)}
			</div>
		);
}

export default UploadPhoto;
