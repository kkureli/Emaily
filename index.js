const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send({ bye: "buddy" });
});

const PORT = process.env.PORT || 5000; //Whenever Heroku runs or application it has the ability to inject what are called environment variablesenvironment variables are variables that are set in the underlying runtime that node is running on top of.

app.listen(PORT);
