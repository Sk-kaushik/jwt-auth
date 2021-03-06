require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

// Setting up Port
const PORT = process.env.PORT || 8080;

// Middleware for accepting json data
app.use(express.json());
app.use(cors());

// Importing Routes
const loginRoute = require("./routes/loginRoute");
const signupRoute = require("./routes/signupRoute");
const homeRoute = require("./routes/homeRoute");

const Username = process.env.MONGO_USERNAME;
const Password = process.env.MONGO_PASSWORD;

// Mongodb URL
const MONGO_URI = `mongodb+srv://${Username}:${Password}@jwt-auth.1lt7q.mongodb.net/jwt-auth?retryWrites=true&w=majority`;

// Connect to Mongodb
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(PORT);
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.static(path.join(__dirname, "/jwt-auth/build")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "/jwt-auth/build", "index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// Setting up routes
app.use(loginRoute);
app.use(signupRoute);
app.use(homeRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("jwt-auth/build"));
}
