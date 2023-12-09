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

router.delete("/:id", Auth.accessValidation, (req, res) => {
  let id = req.params.id;

  if (FilmsModel.delete(id)) {
    res.json({ Message: "Filme excluido com sucesso!" });
  } else {
    res.status(400).json({ message: "Falha ao excluir!" });
  }
});

module.exports = router;
