const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const dbUser = process.env.USER;
const dbPassword = process.env.PASSORD;

const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://projetoback:0Q8Y1tkgJi5zQjJg@cluster0.mmmbs2b.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(port, () => {
      console.log("Rodando na porta -> " + port);
    });
    console.log("Conectado ao Banco!");
  })
  .catch((err) => console.log("Erro ao conectar no BD:" + err));

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const session = require("express-session");
app.use(
  session({
    secret: "2br3C4d5br6",
    resave: false,
    saveUninitialized: false,
  })
);

const filmsRouter = require("./routes/films");
app.use("/films", filmsRouter);

const loginRouter = require("./routes/login");
app.use("/", loginRouter);

const registerRouter = require("./routes/register");
app.use("/", registerRouter);

const userRouter = require("./routes/user");
app.use("/", userRouter);

const adminRouter = require("./routes/admin");
app.use("/", adminRouter);

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_api_doc.json")

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

