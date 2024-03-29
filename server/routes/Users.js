const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middleware/AuthMiddleware");
const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { username, password,firstname, lastname, mob, collegemail, sem, branch, usn } = req.body;
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
      branch: branch,
      usn: usn
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


router.put("/changepassword", validateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await Users.findOne({ where: { username: req.user.username } });

  bcrypt.compare(oldPassword, user.password).then(async (match) => {
    if (!match) res.json({ error: "Wrong Password Entered!" });

    bcrypt.hash(newPassword, 10).then((hash) => {
      Users.update(
        { password: hash },
        { where: { username: req.user.username } }
      );
      res.json("SUCCESS");
    });
  });
});



module.exports = router;