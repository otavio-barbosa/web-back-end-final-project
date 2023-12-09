const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: [{}],
  },
  password: {
    type: [{}],
  },
  role: {
    type: String,
  },
  films: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Film" }],
  },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = {
  list: async function () {
    const users = await UserModel.find({}).lean();
    return users;
  },
  find: async function (find) {
    return await UserModel.findOne(find);
  },
  save: async function (name, email, password, role = "USUARIO") {
    const user = new UserModel({
      name: name,
      email: email,
      password: password,
      role: role,
      films: [],
    });
    await user.save();
    return user;
  },

  update: async function (id, obj) {
    let user = await UserModel.findById(id);
    if (!user) {
      return false;
    }

    Object.keys(obj).forEach((key) => (user[key] = obj[key]));
    await user.save();
    return user;
  },

  delete: async function (id) {
    return await UserModel.findByIdAndDelete(id);
  },

  getById: async function (id) {
    return await UserModel.findById(id).findOne();
  },
};
