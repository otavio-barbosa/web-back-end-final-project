const express = require('express');
const router = express.Router();

const Auth = require('../helpers/Auth');
const FilmsModel = require('../models/Film');

router.get("/", Auth.accessValidation, (req, res) => {
  let list = FilmsModel.list();

  if (req.query.name) {
    list = FilmsModel.listByName();
  } else if (req.query.generous) {
    list = FilmsModel.listByGenerous();
  }

  res.json({ count: list.length, list: list });
})

router.get("/:id", Auth.accessValidation, (req, res) => {
  let object = FilmsModel.getElementById(req.params.id);

  if (object) {
    res.json({ object: object })
  } else {
    res.status(404).json({ message: "ID Inválido" })
  }
})

router.post("/", Auth.accessValidation, (req, res) => {
  let { name, generous, year, time } = req.body;

  if (
    name &&
    generous &&
    year &&
    time
  ) {
    let object = FilmsModel.save(
      name, generous, year, time
    );

    res.json({ object: object });
  } else {
    res.status(400).json({ message: "Falha na inserção do filme" });
  }
})

router.put("/:id", Auth.accessValidation, (req, res) => {
  let { name, generous, year, time } = req.body;
  let id = req.params.id

  if (id && name && generous && year && time) {
    let object = FilmsModel.update(
      id, name, generous, year, time
    )

    if (object) {
      res.json({ object: object });
    } else {
      res.status(400).json({ message: "ID não enconrado!" });
    }
  } else {
    res.status(400).json({ message: "Falha ao alterar as informações!" });
  }
})

router.delete("/:id", Auth.accessValidation, (req, res) => {
  let id = req.params.id;

  if (FilmsModel.delete(id)) {
    res.json({ "Message": "Filme excluido com sucesso!" })
  } else {
    res.status(400).json({ message: "Falha ao excluir!" });
  }
})

module.exports = router