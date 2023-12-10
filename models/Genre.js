const mongoose = require("mongoose");

const { Schema } = mongoose;

const genreSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        required: true,
      },
  }
);

const Genre = mongoose.model("Genre", genreSchema);

module.exports = {
  Genre,
  genreSchema,
};
