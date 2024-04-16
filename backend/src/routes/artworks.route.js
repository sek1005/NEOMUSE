const router = require("express").Router();
const fileUpload = require("../middlewares/fileUpload");

const artworkController = require("../controllers/artworks.controller");
const auth = require("../middlewares/auth");

router.post(
  "/artworks",
  fileUpload.any(),
  auth.isAuth,
  auth.isAdmin,
  artworkController.insert
);
router.get("/artworks", artworkController.getALL);
router.get("/artworks/artists/:id", artworkController.findAllByArtist);
router.get("/artworks/:id", artworkController.getById);
router.get("/technic", artworkController.getTechAll);
router.get("/artworkbytech", artworkController.getBytech);
router.delete(
  "/artworks/:id",
  auth.isAuth,
  auth.isAdmin,
  artworkController.deleteart
);
router.put(
  "/artworks/:id",
  auth.isAuth,
  auth.isAdmin,
  artworkController.updateArtwork
);

module.exports = router;
