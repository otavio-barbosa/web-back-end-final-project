const express = require("express");
const router = express.Router();

const User = require('../models/User')

router.post('/register', async (req, res) => {
  let { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password) {
    return res.status(422).json({ message: 'Preencha todos os campos!' });
  }

  if (password !== confirmPassword) {
    res.status(422).json({ message: 'As senhas não conferem!' });
  }

  const userExist = await User.find({ email: email });

  if (userExist) {
    res.status(422).json({ message: 'Usuário já cadastrado!' })
  } else {
    await User.save(
      name,
      email,
      password,
      'USUARIO'
    );
    res.status(202).json({
      message: 'Usuário criado com sucesso!'
    });
  }
})

module.exports = router;