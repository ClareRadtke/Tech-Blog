const { Post } = require("../../models");
const router = require("express").Router();

// create new post
router.post("/", async (req, res) => {
  console.log("req.body:", req.body);
  const { title, content } = req.body;
  await Post.create({
    title,
    content,
    user_id: 1,
  });
  res.end();
});

// edit/update post
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  await Post.update({ title, content }, { where: { id } });
  res.end();
});

// delete post
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Post.update({ deleted: true }, { where: { id } });
  res.end();
});

// create new comment

// save new comment

// edit comment

// delete comment

module.exports = router;
