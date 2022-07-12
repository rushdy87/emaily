// keys.js - figure out what set of credontials to return
if (process.env.NODE_ENV === "production") {
  // We are in Production mode - return proud set of keys
  module.exports = require("./prod");
} else {
  // We are in development mode - return the dev keys
  module.exports = require("./dev");
}
