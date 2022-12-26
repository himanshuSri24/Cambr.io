const express = require("express");
const router = express.Router();
const { Comments } = require("../models")


router.get("/byID/:id", async (req, res) => {
    const post = req.params.postId
    const comments = await Comments.findAll({where: {
        post : PostId
    }})
    res.json(comments)
  })
  
router.post("/", async (req, res) => {
    const comment = req.body;
    await Comments.create(comment);
    res.json(comment);
  });

module.exports = router
