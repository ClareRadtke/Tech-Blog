const { Post } = require("../../models");
const router = require("express").Router();
const commentRoutes = require("./comments");

router.use("/:postId/comments", commentRoutes);

router.post("/", async (req, res) => {
  const { title, content } = req.body;
  await Post.create({
    title,
    content,
    user_id: req.session.user_id,
  });
  res.end();
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  await Post.update({ title, content }, { where: { id } });
  res.end();
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Post.update({ deleted: true }, { where: { id } });
  res.end();
});

module.exports = router;
