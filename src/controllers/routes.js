const router = require("express").Router();
const { withAuth } = require("../utils/auth");
const { Post, User, Comment } = require("../models");

router.get("/", (req, res) => {
  res.render("main");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/sign-up", (req, res) => {
  res.render("signUp");
});

router.get("/article", (req, res) => {
  res.render("article");
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post, where: { deleted: false } }],
    });

    const user = userData.get({ plain: true });

    res.render("dashboard", {
      user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard/new-post", (req, res) => {
  res.render("newPost");
});

router.get("/posts/:id/edit", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      attributes: { exclude: ["password"] }, // TODO check password is not being returned in the User object
      include: [{ model: User, Comment }],
    });

    const post = postData.get({ plain: true });

    res.render("editPost", {
      post,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }

  // res.render("editPost");
});

router.get("/article", (req, res) => {
  res.render("article");
});

router.get("/logout", (req, res) => {
  res.setHeader("Location", "/login");
  req.session.destroy(() => {
    res.status(307).end();
  });
});

module.exports = router;
