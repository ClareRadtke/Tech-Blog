const { Comment } = require("../../models");
const router = require("express").Router({ mergeParams: true });

router.post("/", async (req, res) => {
  const { content } = req.body;
  await Comment.create({
    content,
    user_id: req.session.user_id,
    post_id: req.params.postId,
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
