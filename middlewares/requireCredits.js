module.exports = (req, res, next) => {
  if (req.user.credits < 5) {
    return res.status(403).send({ error: "Not enough credits!" });
  }
  next();
}; //next right here is a function that we call when our middleware is complete or like all finished running. The next middleware you can think of is kind of being like that done callback that we saw inside of in passport
