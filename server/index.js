const express = require("express");
require("./services/passport");

const app = express();

require("./routes/authRoutes")(
  app
); /* we require the function from authRoutes file,
and invoked it in the same time */

const PORT = process.env.PORT || 5000; /* In many environments (e.g. Heroku),
and as a convention, you can set the environment variable PORT to tell your
web server what port to listen on.
So process.env.PORT || 5000 means: whatever is in the environment variable PORT,
or 5000 if there's nothing there. */

app.listen(PORT, () => console.log("The app running at port " + PORT));
