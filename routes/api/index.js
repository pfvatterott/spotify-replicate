const router = require("express").Router();
const spotify = require("./spotify")

// Book routes
router.use("/spotify", spotify);


module.exports = router;
