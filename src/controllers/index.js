const router = require("express").Router();
const homeRoutes = require("./routes");
const apiRoutes = require("./api");

router.use("/api", apiRoutes);
router.use("/", homeRoutes);

module.exports = router;
