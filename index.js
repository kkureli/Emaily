//siralamalar onemli
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //max age property max age is how long this cookie can exist inside the browser beforeit is automatically expired for us.
    keys: [keys.cookieKey],
  })
);

//passport.initialize() and passport.session() are invoked on each request and they are the ones that cause serializeUser to load the user id to req.user if a serialized user is found in the server (when using mongodb, if the user exist in mongodb).
app.use(passport.initialize());
app.use(passport.session()); //calls deserializeUser on each request, which queries the mongodb using the user._id that was initially loaded to req.user by serializeUser and stores the more information about user in the req.user.

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000; //Whenever Heroku runs or application it has the ability to inject what are called environment variablesenvironment variables are variables that are set in the underlying runtime that node is running on top of.
app.listen(PORT);
