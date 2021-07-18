const { Comment, Post } = require("../../models");
const router = require("express").Router({ mergeParams: true });

router.post("/", async (req, res) => {
  // console.log("req.param:", req.params, "req.body:", req.body);
  const { content } = req.body;
  const { postId } = req.params;
  await Comment.create({
    content,
    user_id: 1,
    post_id: postId,
  });
  res.end();
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  await Comment.update({ content }, { where: { id } });
  res.end();
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Comment.update({ deleted: true }, { where: { id } });
  res.end();
});

module.exports = router;
