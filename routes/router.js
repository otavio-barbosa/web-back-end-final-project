const router = require("express").Router();

const filmsRouter = require("./films");

router.use("/", filmsRouter);

const registerRouter = require("./register");

router.use("/", registerRouter);

module.exports = router;
