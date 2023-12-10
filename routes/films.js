const express = require("express");
const router = express.Router();

const Auth = require("../helpers/Auth");
const FilmsModel = require("../models/Film");

const filmController = require("../controllers/filmController");

router.get("/films", Auth.accessValidation, (req, res) => {
  filmController.getAll(req, res);
});

router.get("/films/:id", Auth.accessValidation, (req, res) => {
  filmController.get(req, res);
});

router.post("/film", Auth.accessValidation, (req, res) => {
  filmController.create(req, res);
});

router.put("/film/:id", Auth.accessValidation, (req, res) => {
  filmController.update(req, res);
});

router.delete("/film/:id", Auth.accessValidation, (req, res) => {
  filmController.delete(req, res);
});

module.exports = router;
