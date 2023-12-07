const User = require("../models/User");

module.exports = {
  isAdmin: async (req, res, next) => {
    const email = req.session.email;
    const user = await User.find({ email: email })

    if (user.role !== 'ADMIN') {
      return res.status(202).json({
        message: "Somente administradores estão autorizados!",
      });
    }
    next();
  },
};