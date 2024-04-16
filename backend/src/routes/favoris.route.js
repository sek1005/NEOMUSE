const router = require("express").Router();
const favorisController = require("../controllers/favoris.controller");
const { isAuth } = require("../middlewares/auth");

router.get("/favoris", isAuth, favorisController.getFavorites);
router.post("/favoris", isAuth, favorisController.createFavorite);
router.delete("/favoris", isAuth, favorisController.deleteFavorite);

module.exports = router;
