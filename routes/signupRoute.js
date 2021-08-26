const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const route = express.Router();

const User = require("../models/user");

route.post("/signup", async (req, res) => {
  // CHECK IF EMAIL ALREADY EXIST
  const verifyEmail = await User.findOne({ email: req.body.email }, (err, data) => {
    if (data) {
      return true;
    } else {
      return false;
    }
  });

  // CREATE USER IF NO USER WITH THIS EMAIL IS PRESENT
  if (!verifyEmail) {
    const hashedPwd = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      email: req.body.email,
      username: req.body.username,
      password: hashedPwd,
    });

    try {
      // CREATING USER FOR TOKEN
      const localUser = {
        email: req.body.email,
        password: req.body.password,
      };

      // CREATING TOKEN
      const token = createToken(localUser);

      // SAVE USER TO DATABASE
      user
        .save()
        .then((result) => {
          // SENDING DATA AND TOKEN TO CLIENT
          res.send({ token: token }).status(201);
        })
        // ERROR IN SAVING
        .catch((err) => {
          res.send(err).status(500);
        });
    } catch {
      console.log(err);
    }
  } else {
    // SEND 409 (CONFLICT) STATUS CODE IF EMAIL ALREADY EXIST
    res.status(409).send({ message: "User already exists" });
  }

  function createToken(user) {
    // CREATING JWT ACCESS TOKEN
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET_KEY);
    return accessToken;
  }
});

module.exports = route;
