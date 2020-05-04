module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: "You must log in!" });
  }
  next();
}; //next right here is a function that we call when our middleware is complete or like all finished running. The next middleware you can think of is kind of being like that done callback that we saw inside of in passport
