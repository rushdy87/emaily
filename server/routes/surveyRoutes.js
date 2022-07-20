const mongoose = require("mongoose");
const requireLogin = require("../meddlewares/requireLogin");
const requireCredits = require("../meddlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys");

module.exports = (app) => {
  app.get("/api/surveys/thanks", (req, res) => {
    res.send("Thanks for Voting!");
  });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const servey = new Survey({
      title,
      subject,
      body,
      recipients: recipients
        .split(",")
        .map((email) => ({ email: email.trim() })), // trim to remove whitespace from the start and end of an email
      _user: req.user.id,
      dateSent: Date.now(),
    });
    const mailer = new Mailer(servey, surveyTemplate(servey));
    try {
      await mailer.send();

      await servey.save();

      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (error) {
      res.status(422).send(error);
    }
  });
};
