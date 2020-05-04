const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"], //users profile informations and email
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout(); //kill the cookies
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
