const jwt = require("jsonwebtoken");

module.exports = {
  accessValidation: (req, res, next) => {
    let beartoken = req.headers["authorization"] || "";
    let token = beartoken.split(" ")[1];

    console.log("bear token:", beartoken);
    console.log("token:", token);

    jwt.verify(token, "232@#!", (error, object) => {
      if (error)
        res.status(403).json({
          message: "Acesso Negado! token inválido!",
        });
      else {
        next();
      }
    });
  },
};
