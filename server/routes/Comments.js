const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const {validateToken} = require('../middleware/AuthMiddleware')

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({ where: { PostId: postId } });
  res.json(comments);
});

router.delete("/:commentId", validateToken, async (req, res) => {
  const commentId = req.params.commentId;

  await Comments.destroy({
    where: {
      id: commentId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});

router.post("/", validateToken, async (req, res) => {
  const comment = req.body;
  const username = req.user.username
  comment.username = username
  const newComment = await Comments.create(comment);
  res.json(newComment);
}); 

router.put("/commentText", validateToken, async (req, res) => {
  const { newText, id } = req.body;
  await Comments.update({ commentBody: newText }, { where: { id: id } });
  res.json(newText);
});


module.exports = router;