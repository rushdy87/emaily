const passport = require("passport"); /* passport is General helpers for handling auth in Express apps */
const GoogleStrategy = require("passport-google-oauth20").Strategy;
/* strategy is Helpers for authenticating with one very specific method
(email/password, Google, Facebook, etc) */

const keys = require("../config/keys");

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
