const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middleware/AuthMiddleware");
const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { username, password,firstname, lastname, mob, collegemail, sem, branch } = req.body;
  const user = await Users.findOne({ where: { username: username } });

  if (user) {
    res.json({ error: "User Already Exists" });
  }
  else{
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
      firstname: firstname,
      lastname: lastname,
      mob: mob,
      collegemail: collegemail,
      sem: sem,
      branch: branch
    });
    res.json("User created successfully");
  });
}});

router.get("/checkLogin", validateToken, (req, res) => {
  res.json(req.user);
});


router.get("/prof/:username", async (req, res) => {
  const user = req.params.username;
  const posts = await Users.findOne ({where: { username: user } });
  res.json(posts);
})

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) res.json({ error: "User Doesn't Exist" });
  else {
  bcrypt.compare(password, user.password).then(async (match) => {
    if (!match) res.json({ error: "Wrong Username And Password Combination" });

    const accessToken = sign(
      { username: user.username, id: user.id },
      "thisisasecurekey"
    );
    res.json({ token: accessToken, username: username, id: user.id });
  });
}
});

module.exports = router;