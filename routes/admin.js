const express = require("express");
const router = express.Router();

const Access = require("../helpers/UsersAccess");
const UserDAO = require("../models/User");


router.get("/admin", (req, res) => {
  UserDAO.list().then((users) => {
      res.status(202).json({users})
  })
})

router.post("/admin/create", Access.isAdmin, async (req, res) => {
  let { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(422).json({ message: "Preencha todos os campos!" });
  }

  const userExist = await UserDAO.find({ email: email });

  if (userExist) {
    res.status(422).json({ message: "Usuário já cadastrado!" });
  } else {
    await UserDAO.save(name, email, password, 'USUARIO');
    res.status(202).json({
      message: "Usuário criado com sucesso!",
    });
  }
});

router.post("/admin/createAdmin", Access.isAdmin, async (req, res) => {
  let { name, email, password } = req.body;
  const emailAdm = email.split('@')[1];

  if (!name || !email || !password) {
    return res.status(422).json({ message: "Preencha todos os campos!" });
  }

  const userExist = await UserDAO.find({ email: email });

  if (userExist) {
    res.status(422).json({ message: "Usuário já cadastrado!" });
  }
  
  if (emailAdm == "admin.com") {
    await UserDAO.save(name, email, password, 'ADMIN');
    res.status(202).json({
      message: "Usuário criado com sucesso!",
    });
  } else {
    res.status(400).json({
      message: "Tipo de cadastro errado para administradores!"
    });
  }
});

router.put("/admin/:id", Access.isAdmin, async (req, res) => {
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
  console.log('obj -> ' + JSON.stringify(obj))

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

router.delete("/admin/:id", Access.isAdmin, (req, res) => {
  UserDAO.delete(req.params.id)
    .then((user) => {
      if (user)
        res.status(202).json({
          message: "Usuário excluido com sucesso!",
        });
      else res.status(500).json({ message: "Usuário não encontrado!" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Falha ao excluir o usuário!" });
    });
});

module.exports = router;
