const express = require("express");
const asyncHandler = require("express-async-handler");

const userRepository = require("../../db/user-repository");

const router = express.Router();

router.get(
  "/user/:id",
  asyncHandler(async function (req, res) {
    const user = await userRepository.findUserByPK(req.params.id);
    return res.json([user]);
  })
);

module.exports = router;
