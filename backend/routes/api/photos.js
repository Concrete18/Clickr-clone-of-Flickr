const express = require('express');
const asyncHandler = require('express-async-handler');

const PhotoRepository = require('../../db/photo-repository');

const router = express.Router();

router.get('/', asyncHandler(async function(_req, res) {
  const photos = await PhotoRepository.list();
  return res.json(photos);
}));

module.exports = router;
