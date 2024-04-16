const router = require("express").Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import routes here
const itemRouter = require("./routes/items.route");
const userRouter = require("./routes/user.route");
const artistRouter = require("./routes/artists.route");
const artworkRouter = require("./routes/artworks.route");
const favorisRouter = require("./routes/favoris.route");
const eventRouter = require("./routes/events.route");
// Apply routes
router.use(itemRouter);
router.use(userRouter);
router.use(artworkRouter);
router.use(favorisRouter);

router.use(eventRouter);
router.use(artistRouter);
/* ************************************************************************* */

module.exports = router;
