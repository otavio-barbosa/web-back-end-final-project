const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  let { user, password } = req.body;

  if (user != '' && user == password) {
    let token = jwt.sign(
      { user: user }, '232@#!', { expiresIn: '10 min' }
    )
    res.json({ logged: true, token: token })
  } else {
    res.status(403).json(
      {
        logged: false,
        message: "Erro ao logar, verifique e tente novamente!"
      }
    )
  }
})

module.exports = router;