const router = require("express").Router();

router.use("/notes", require("./note.route"));

module.exports = router;
