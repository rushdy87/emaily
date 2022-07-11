const passport = require("passport"); /* passport is General helpers for handling auth in Express apps */
const GoogleStrategy = require("passport-google-oauth20").Strategy;
/* strategy is Helpers for authenticating with one very specific method
(email/password, Google, Facebook, etc) */
const mongoose = require("mongoose");

const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((error) => console.log(error));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })
        .then((existingUser) => {
          if (existingUser) {
            return existingUser;
          }
          return new User({ googleId: profile.id }).save();
        })
        .then((user) => done(null, user))
        .catch((error) => console.log(error));
    }
  )
);
