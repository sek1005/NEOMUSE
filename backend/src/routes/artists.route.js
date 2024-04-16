const router = require("express").Router();
const fileUpload = require("../middlewares/fileUpload");
const artistController = require("../controllers/artist.controller");
const auth = require("../middlewares/auth");

router.post(
  "/artists",
  fileUpload.any(),
  auth.isAuth,
  auth.isAdmin,
  artistController.insert
);
router.get("/artists", artistController.findAll);
router.get("/artists/:id", artistController.findById);
router.get("/artists", artistController.findByName);
router.delete(
  "/artists/:id",
  auth.isAuth,
  auth.isAdmin,
  artistController.deleteart
);
router.put(
  "/artists/:id",
  auth.isAuth,
  auth.isAdmin,

  artistController.updateArtist
);

module.exports = router;
