const express = require("express");
const passport = require("passport"); /* passport is General helpers for handling auth in Express apps */
const GoogleStrategy = require("passport-google-oauth20").Strategy;
/* strategy is Helpers for authenticating with one very specific method
(email/password, Google, Facebook, etc) */

const keys = require("./config/keys");

const app = express();

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken) => {
      console.log(accessToken);
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get("/auth/google/callback", passport.authenticate("google"));

const PORT = process.env.PORT || 5000; /* In many environments (e.g. Heroku),
and as a convention, you can set the environment variable PORT to tell your
web server what port to listen on.
So process.env.PORT || 5000 means: whatever is in the environment variable PORT,
or 5000 if there's nothing there. */

app.listen(PORT, () => console.log("The app running at port " + PORT));
