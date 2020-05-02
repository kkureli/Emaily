const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users"); //So one argument means we are trying to fetch something out of mongoose. Two arguments means we're trying to load something into it.

//have the ability to take our user model and put some identifying piece of information into the cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//pull it back out and turn into a user at some point in the future
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      //where we create new user with informations coming from google
      //   console.log("accessToken:", accessToken);
      //   console.log("refreshToken:", refreshToken);
      //   console.log("profile:", profile);
      //   console.log("done:", done);
      User.findOne({ googleId: profile.id }) //returning promises
        .then((existingUser) => {
          if (existingUser) {
            //we already have a record with the given profile ID

            done(null, existingUser); //null meaning for no errors
          } else {
            //we don't have a user record with this ID
            new User({ googleId: profile.id })
              .save()
              .then((user) => done(null, user));
          }
        });
    }
  )
);
