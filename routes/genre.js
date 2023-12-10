const express = require("express");
const router = express.Router();

const Auth = require("../helpers/Auth");

const genreController = require("../controllers/genreController");

router.get("/genre", Auth.accessValidation, (req, res) => {
  genreController.getAll(req, res);
});

router.get("/genre/:id", Auth.accessValidation, (req, res) => {
  genreController.get(req, res);
});

router.post("/genre", Auth.accessValidation, (req, res) => {
  genreController.create(req, res);
});

router.put("/genre/:id", Auth.accessValidation, (req, res) => {
  genreController.update(req, res);
});

router.delete("/genre/:id", Auth.accessValidation, (req, res) => {
    genreController.delete(req, res);
});

module.exports = router;