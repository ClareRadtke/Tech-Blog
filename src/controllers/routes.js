const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("main");
});

router.get("/login", (req, res) => {
  res.render("login");
});

// signup
router.get("/sign-up", (req, res) => {
  res.render("signUp");
});

// article
router.get("/article", (req, res) => {
  res.render("article");
});

// dashboard
router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

module.exports = router;
