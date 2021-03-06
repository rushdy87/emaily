const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../meddlewares/requireLogin");
const requireCredits = require("../meddlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys");

module.exports = (app) => {
  app.get("/api/surveys", async (req, res) => {
    try {
      const surveys = await Survey.find({ _user: req.user.id }).select({
        recipients: false,
      });
      res.send(surveys);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thanks for Voting!");
  });

  app.post("/api/surveys/webhooks", requireLogin, (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice");

    _.chain(req.body)
      .map(({ url, email }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy("email", "surveyId")
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false },
            },
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date(),
          }
        ).exec();
      })
      .value();
    res.send({});
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
