const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");
const {validateToken} = require('../middleware/AuthMiddleware')

router.get("/", async (req, res) => {
  const listOfPosts = await Posts.findAll({ include: [Likes] });
  res.json(listOfPosts);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id, { include: [Likes] });
  res.json(post);
});

router.delete("/:id", validateToken, async (req, res) => {
  const id = req.params.id;

  await Posts.destroy({
    where: {
      id: id,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});

router.post("/", validateToken, async (req, res) => {
  const post = req.body;
  const username = req.user.username
  post.username = username
  await Posts.create(post);
  res.json(post);
});

module.exports = router;