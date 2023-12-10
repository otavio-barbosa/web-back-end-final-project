const mongoose = require("mongoose");

const { Schema } = mongoose;

const ageRangeSchema = new Schema({
  country: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
});

const AgeRange = mongoose.model("AgeRange", ageRangeSchema);

module.exports = { AgeRange };
