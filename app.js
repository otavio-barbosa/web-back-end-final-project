const express = require('express');
const app = express();
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const filmsRouter = require('./routes/films');
app.use('/films', filmsRouter);

const loginRouter = require('./routes/login');
app.use('/', loginRouter);

app.listen(port, () => {
  console.log("Rodando na porta -> " + port);
})