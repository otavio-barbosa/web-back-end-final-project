const express = require('express');
const app = express();
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const session = require('express-session');
app.use((session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
})));

const filmsRouter = require('./routes/films');
app.use('/films', filmsRouter);

const loginRouter = require('./routes/login');
app.use('/', loginRouter);

const registerRouter = require('./routes/register');
app.use('/', registerRouter);

app.listen(port, () => {
  console.log("Rodando na porta -> " + port);
})