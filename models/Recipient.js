const mongoose = require("mongoose");
// const Schema = mongoose.Schema
const { Schema } = mongoose; //to create collections with different properties

const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false },
});

module.exports = recipientSchema;
