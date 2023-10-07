const router = require("express").Router();
const spotify = require("./spotify")
const replicate = require("./replicate")

router.use("/spotify", spotify);
router.use("/replicate", replicate)


module.exports = router;
