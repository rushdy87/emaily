const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");

const keys = require("./config/keys");
require("./models/user");
require("./models/survey");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(express.json()); // instead of app.use(bodyparser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());
/* app.use(middleware), meddleware is a small function that can used to modify 
incoming requset to our app befor they sent off to rout handlers. */

require("./routes/authRoutes")(app);
/* we require the function from authRoutes file, and invoked it in the same time */
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

// start: the code at the bottom work in the production environment
if (process.env.NODE_ENV === "production") {
  // 1- Express will serve up production assets like main.js, or main.css
  app.use(express.static("client/build")); //built-in middleware for serves static.

  // 2- Express will serve up production index.html, if it doesn't recognize the route
  const path = require("path"); //The Path module provides a way of working with directories and file paths.
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    // 3- The path.resolve() resolves a sequence of paths or path segments into an absolute path.
    // 4- The __dirname returns the path of the folder where the current JavaScript file resides.
    // 5- The Order important, app.get('*') must be the last route in the app
  });
}
// end: the code above end here

const PORT = process.env.PORT || 5000; /* In many environments (e.g. Heroku),
and as a convention, you can set the environment variable PORT to tell your
web server what port to listen on.
So process.env.PORT || 5000 means: whatever is in the environment variable PORT,
or 5000 if there's nothing there. */

app.listen(PORT, () => console.log("The app running at port " + PORT));
