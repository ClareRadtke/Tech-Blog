const router = require("express").Router();

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

router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

router.get("/dashboard/new-post", (req, res) => {
  res.render("newPost");
});

router.get("/dashboard/:postID/edit", (req, res) => {
  res.render("editPost");
});

router.get("/article", (req, res) => {
  res.render("article");
});

module.exports = router;
