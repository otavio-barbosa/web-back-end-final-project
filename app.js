const express = require('express');
const app = express();
const port = 3000

//aceita formato json para req e res
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Conexão com o BD

const dbUser = process.env.USER;
const dbPassword = process.env.PASSORD;

const mongoose = require('mongoose');
mongoose.connect(
  `mongodb+srv://projetoback:0Q8Y1tkgJi5zQjJg@cluster0.mmmbs2b.mongodb.net/?retryWrites=true&w=majority`,
  )
  .then(() => {
    app.listen(port, () => {
      console.log("Rodando na porta -> " + port);
    })
    console.log('Conectado ao Banco!')
  })
  .catch((err) => console.log('Erro ao conectar no BD:' + err))


//CookieParser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// const session = require('express-session');
// app.use((session({
//   secret: process.env.SECRET,
//   resave: false,
//   saveUninitialized: false
// })));

//Rotas

const filmsRouter = require('./routes/films');
app.use('/films', filmsRouter);

const loginRouter = require('./routes/login');
app.use('/', loginRouter);

const registerRouter = require('./routes/register');
app.use('/', registerRouter);