// It's subdocument collection for survey
const { Schema } = require("mongoose");

const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false },
});

module.exports = recipientSchema;
