const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const profilesRouter = require("./profiles.js");
const photoRouter = require("./photos.js");
const commentRouter = require("./comments.js");
const albumRouter = require("./albums.js");

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/profiles", profilesRouter);
router.use("/photos", photoRouter);
router.use("/comments", commentRouter);
router.use("/albums", albumRouter);

// GET /api/set-token-cookie
const asyncHandler = require("express-async-handler");
const { setTokenCookie } = require("../../utils/auth.js");
const { User } = require("../../db/models");
router.get(
  "/set-token-cookie",
  asyncHandler(async (req, res) => {
    const user = await User.findOne({
      where: {
        username: "Demo-lition",
      },
    });
    setTokenCookie(res, user);
    return res.json({ user });
  })
);

// GET /api/restore-user
const { restoreUser } = require("../../utils/auth.js");
router.get("/restore-user", restoreUser, (req, res) => {
  return res.json(req.user);
});

// GET /api/require-auth
const { requireAuth } = require("../../utils/auth.js");
router.get("/require-auth", requireAuth, (req, res) => {
  return res.json(req.user);
});

module.exports = router;
