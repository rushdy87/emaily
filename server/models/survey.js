const mongoose = require("mongoose");
const { Schema } = mongoose;

const RecipientSchema = require("./recipient");

const surveySchema = new Schema({
  title: String, // Title of the survey the user will see in our app.
  body: String, // Text to show in the survey.
  subject: String, // Subject line.
  recipients: [RecipientSchema], //array of subdocument collection -RecipientSchema.
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: {
    /*
     * _ not required we can name it user
     * reference to anothe instance of user
     */
    type: Schema.Types.ObjectId,
    ref: "User", // returns a model.
  },
  dateSent: Date,
  lastResponded: Date,
});

mongoose.model("surveys", surveySchema);
