//import routes///
const apiRoutes = require("./api");

const router = require("express").Router();

//use api for all api routes//
router.use("/api", apiRoutes);

router.use((req, res) => {
  res.status(404).send("<h2>something went wrong! 404 Error !!</h2>");
});

//exporting mdule//
module.exports = router;