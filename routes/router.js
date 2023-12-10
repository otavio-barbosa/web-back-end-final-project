const router = require("express").Router();

const filmsRouter = require("./films");

router.use("/", filmsRouter);

const genreRouter = require("./genre");

router.use("/", genreRouter);

const registerRouter = require("./register");

const ageRangeRouter = require("./ageRange");

router.use("/", ageRangeRouter);

router.use("/", registerRouter);

module.exports = router;
