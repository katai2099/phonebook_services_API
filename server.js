const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();

//DB Connection
const db = require("./models/index");
db.sequelize;

//Router
const phonebookRoute = require("./routes/phonebook");

app.use(bodyParser.json());

app.use("/phonebook", phonebookRoute);

app.get("/", (req, res) => {
  res.send("Welcome to Phonebook Service Application");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Server is running on port " + port);
  console.log(`You can access on http://127.0.0.1:${port}`);
});
