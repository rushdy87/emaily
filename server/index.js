const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");

const keys = require("./config/keys");
require("./models/user");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());
/*
 * app.use(middleware), meddleware is a small function that can used to modify 
incoming requset to our app befor they sent off to rout handlers.
 */

require("./routes/authRoutes")(app);
/* we require the function from authRoutes file,
and invoked it in the same time */

const PORT = process.env.PORT || 5000; /* In many environments (e.g. Heroku),
and as a convention, you can set the environment variable PORT to tell your
web server what port to listen on.
So process.env.PORT || 5000 means: whatever is in the environment variable PORT,
or 5000 if there's nothing there. */

app.listen(PORT, () => console.log("The app running at port " + PORT));
