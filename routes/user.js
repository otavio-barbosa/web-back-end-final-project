const express = require("express");
const router = express.Router();

const Auth = require("../helpers/Auth");
const UserDAO = require("../models/User");

router.put("/user/:id", Auth.accessValidation, async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  let obj = {};
  if (name) obj.name = name;
  if (email) obj.email = email;
  if (password) obj.password = password;

  if (obj == {}) {
    res.status(500).json({
      message: "Nenhum atributo foi modificado"
    });
  }

  await UserDAO.update(id, obj)
    .then((user) => {
      if (user) res.status(202).json({
        message:  "Usuário atualizado com sucesso!"
      });
      else res.status(500).json({
        message: "Usuário não encontrado!"
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(fail("Falha ao alterar o usuário!"));
    });
});

module.exports = router;