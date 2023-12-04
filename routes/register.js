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

  //Verificando se o usuário existe
  //findOne é um método do mongoose
  const userExist = await User.findOne({ email: email });
  userExist ? res.status(422).json({ message: 'Usuário já cadastrado!' }) : null;

  //criando usuário no banco
  const user = new User({
    name,
    email,
    password
  })

  try {
    //salva o documento no BD
    await user.save();
    res.status.json({
      message: 'Usuário criado com sucesso!'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Erro no servidor! ' + error
    });
  }
})

module.exports = router;