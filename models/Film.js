const mongoose = require("mongoose");

const { Schema } = mongoose;

const filmSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: [{}],
    required: true,
  },
  ageRange: {
    type: [{}],
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
});

const Film = mongoose.model("Film", filmSchema);

module.exports = { Film };
