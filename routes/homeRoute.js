const express = require("express");
const jwt = require("jsonwebtoken");

const route = express.Router();

require("dotenv").config();

const User = require("../models/user");

route.get("/home", authorize, async (req, res) => {
  // GETTING THE USER FROM DATABASE BASED ON TOKEN DATA
  try {
    const allUsers = await User.findOne({ email: req.user.email }, (err, data) => {
      if (err) {
        throw new Error(err);
      } else {
        return data;
      }
    });
    res.send({ user: allUsers }).status(200);
  } catch {
    console.log(err);
  }
});

// CHECK IF USER HAS VALID TOKEN OR NOT TO ACCESS PRIVATE DATA
function authorize(req, res, next) {
  // GET TOKEN FROM HEADER
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // CHECK IF TOKEN IS NULL AND RETURN TO CLIENT WITH ERROR
  if (token === null || token === undefined) {
    return res.status(401).send({ message: "You are not authorized" });
  }

  // VERIFY THE TOKEN
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).send({ message: "Error while logging in" });
    }
    req.user = user;
    next();
  });
}

module.exports = route;
