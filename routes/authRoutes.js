const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"], //users profile informations and email
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/api/logout", (req, res) => {
    req.logout(); //kill the cookies
    res.send(req.user); //it should be empty screen
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
