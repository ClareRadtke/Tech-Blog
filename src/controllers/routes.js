const router = require("express").Router();
const { withAuth } = require("../utils/auth");
const { Post, User, Comment } = require("../models");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { deleted: false },
      raw: true,
      order: [["createdAt", "DESC"]],
      include: [{ model: User, attributes: { exclude: ["password"] } }],
    });

    const posts = postData.map((post) => {
      return {
        ...post,
        User: {
          id: post["User.id"],
          username: post["User.username"],
        },
      };
    });

    res.render("main", {
      postData: posts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/sign-up", (req, res) => {
  res.render("signUp");
});

router.get("/posts/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: { exclude: ["password"] } },
        {
          model: Comment,
          include: [{ model: User, attributes: { exclude: ["password"] } }],
        },
      ],
    });

    const post = postData.get({ plain: true });
    res.render("article", {
      post,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post, where: { deleted: false }, required: false }],
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

router.get("/dashboard/new-post", withAuth, (req, res) => {
  res.render("newPost");
});

router.get("/posts/:id/edit", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: { exclude: ["password"] } },
        { model: Comment },
      ],
    });

    const post = postData.get({ plain: true });

    res.render("editPost", {
      post,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/logout", withAuth, (req, res) => {
  res.setHeader("Location", "/login");
  req.session.destroy(() => {
    res.status(307).end();
  });
});

module.exports = router;
