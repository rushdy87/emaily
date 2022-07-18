const mongoose = require("mongoose");
const requireLogin = require("../meddlewares/requireLogin");
const requireCredits = require("../meddlewares/requireCredits");

const Servey = mongoose.model("serveys");

module.exports = (app) => {
  app.post("/api/surveys", requireLogin, requireCredits, (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const servey = new Servey({
      title,
      subject,
      body,
      recipients: recipients
        .split(",")
        .map((email) => ({ email: email.trim() })),
      _user: req.user.id,
      date: Date.new(),
    });
  });
};
