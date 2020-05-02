const mongoose = require("mongoose");
// const Schema = mongoose.Schema
const { Schema } = mongoose; //to create collections with different properties

const userSchema = new Schema({
  googleId: String,
});

mongoose.model("users", userSchema); //So one argument means we are trying to fetch something out of mongoose. Two arguments means we're trying to load something into it.
