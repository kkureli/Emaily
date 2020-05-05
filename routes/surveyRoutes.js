const _ = require("lodash");
const Path = require("path-parser").default;
const url = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys");

module.exports = (app) => {
  // app.get("/api/surveys", async (req, res) => {
  //   const surveys = await Survey.find({ _user: req.user.id });
  //   res.send(surveys);
  // });

  app.get("/api/surveys/:key/yes", async (req, res) => {
    const path = req.url;
    const surveyID = path.split("/").reverse()[2];
    const survey = await Survey.find({ _id: surveyID });
    const updatedYes = (survey[0].yes += 1);

    const updatedSurvey = await Survey.updateOne(
      { _id: surveyID },
      { yes: updatedYes }
    );
  });

  app.get("/api/surveys/:key/no", async (req, res) => {
    const path = req.url;
    const surveyID = path.split("/").reverse()[2];
    const survey = await Survey.find({ _id: surveyID });
    const updatedNo = (survey[0].no += 1);

    const updatedSurvey = await Survey.updateOne(
      { _id: surveyID },
      { no: updatedNo }
    );
  });

  app.get("/api/surveys/thanks", (req, res) => {
    res.send("Thanks for voting!");
  });

  app.get("/api/user_surveys", async (req, res) => {
    const userSurveys = await Survey.find({ _user: req.user.id });
    res.send(userSurveys);
  });
  // app.post("/api/surveys/webhooks", (req, res) => {
  //   console.log("hey", req.body);

  //   const events = _.map(req.body, ({ email, url }) => {
  //     const pathname = new URL(url).pathname;
  //     const p = new Path("/api/surveys/:surveyId/:choice");
  //     const match = p.test(pathname);
  //     if (match) {
  //       return { email, surveyId: match.surveyId, choice: match.choice };
  //     }
  //   });
  //   const compactEvents = _.compact(events);
  //   const uniqueEvents = _.uniqueBy(compactEvents, "email", "surveyId");
  // });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients
        .split(",")
        .map((email) => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 5;
      const user = await req.user.save();

      res.send(user);
    } catch {
      res.status(422).send(err);
    }
  });
};
