const router = require("express").Router();

const artworkController = require("../controllers/events.controller");

router.get("/events", artworkController.getAll);

module.exports = router;
