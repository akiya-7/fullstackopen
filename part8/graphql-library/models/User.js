const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = mongoose.Schema({
  username: { type: String, required: true, minLength: 3, unique: true },
  favouriteGenre: { type: String },
});

schema.plugin(uniqueValidator);

module.exports = mongoose.model("User", schema);
