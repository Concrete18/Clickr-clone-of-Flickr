const express = require("express");
const asyncHandler = require("express-async-handler");

const AlbumRepository = require("../../db/album-repository");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async function (_req, res) {
    const albums = await AlbumRepository.list();
    return res.json(albums);
  })
);

module.exports = router;
