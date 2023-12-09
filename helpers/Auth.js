const UserDAO = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports = {
  accessValidation: (req, res, next) => {
    let beartoken = req.headers["authorization"] || "";
    let token = beartoken.split(" ")[1];

    console.log("bear token:", beartoken);
    console.log("token:", token);

    jwt.verify(token, "232@#!", async (error, object) => {
      if (error)
        res.status(403).json({
          message: "Acesso Negado! token inválido!",
        });
      else {
        const { id: userId } = object;

        const user = await UserDAO.getById(userId);

        req.user = user;

        next();
      }
    });
  },
};
