const express = require('express');
const asyncHandler = require('express-async-handler');

const PhotoRepository = require('../../db/photo-repository');

const router = express.Router();

router.get('/', asyncHandler(async function(_req, res) {
  const photos = await PhotoRepository.list();
  return res.json(photos);
}));

router.get('/users/:id', asyncHandler(async function(req, res) {
  const photos = await PhotoRepository.findPhotosByUserId(req.params.id);
  return res.json(photos);
}));

router.get('/:id', asyncHandler(async function(req, res) {
  const photos = await PhotoRepository.findPhotosByPK(req.params.id);
  return res.json(photos);
}));

router.post('/new', asyncHandler(async function(req, res) {
  const photos = await PhotoRepository.createPhoto(req.body);
  return res.json(photos);
}));

router.delete('/delete/:id', asyncHandler(async function(req, res) {
	const photoId = req.params.id
	const photos = await PhotoRepository.deletePhoto(photoId);
	return res.json(photos);
}));

module.exports = router;
