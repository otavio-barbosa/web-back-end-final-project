const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require('../models/User');

router.post("/login", async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({
      message: 'Preencha todos os campos!'
    });
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).json({
      message: 'Usuário não encontrado!'
    });
  }

  try {
    const token = jwt.sign(
      { id: user._id }, '232@#!', { expiresIn: '10 min' }
    );

    res.status(202).json({
      message: 'Usuário logado com sucesso!',
      logged: true,
      token: token
    });
  } catch (error) {
    res.status(403).json(
      {
        logged: false,
        message: "Erro ao logar, verifique e tente novamente!"
      }
    );
  }
})

module.exports = router;