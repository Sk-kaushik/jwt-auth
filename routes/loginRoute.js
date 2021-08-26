require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const route = express.Router();

// USER MODEL
const User = require("../models/user");

// LOGIN ROUTE
route.post("/login", async (req, res) => {
  // CHECK IF USER IS ASSOCIATED WITH EMAIL
  const user = await User.findOne({ email: req.body.email }, (err, data) => {
    if (err) {
      return null;
    } else {
      return data;
    }
  });

  // IF NO USER RETURN 404
  if (user === null) {
    return res.status(400).send({ message: "cannot find user" });
  }

  // COMPARE HASHED PASSWORD
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const localUser = { email: user.email, password: user.password };

      // CREATING JWT ACCESS TOKEN
      const accessToken = jwt.sign(localUser, process.env.ACCESS_TOKEN_SECRET_KEY);

      // IF PASSWORD MATCH RETURN TOKEN  TO THE CLIENT
      return res.status(200).json({ token: accessToken });
    } else {
      return res.status(401).send({ message: "Incorrect Password" });
    }
  } catch {
    return res.status(404).send();
  }
});

module.exports = route;
