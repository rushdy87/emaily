const mongoose = require("mongoose");

const { Schema } = mongoose; /* Everything in Mongoose starts with a Schema.
Each schema maps to a MongoDB collection and defines the shape of the documents
within that collection. */

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 },
});

mongoose.model("users", userSchema);
/*
* Models defined on the mongoose instance are available to all connection
created by the same mongoose instance.
* Mangoose will not overwrite existing collection, it will only craete it if it does not already exit*/
