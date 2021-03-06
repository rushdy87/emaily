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
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await new User({ googleId: profile.id }).save();
        }
        done(null, user);
      } catch (error) {
        console.log(error);
      }
    }
  )
);
