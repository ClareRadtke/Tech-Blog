const { User } = require("../../models");
const router = require("express").Router();

// Create new user
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = (
      await User.create({
        username,
        password,
      })
    ).get({ plain: true });
    if (user) {
      req.session.save(() => {
        req.session.user_id = user.id;
        req.session.logged_in = true;
        res.status(200).json({ username });
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        username,
      },
    });
    if (!user) {
      res
        .status(401)
        .send({ message: "Incorrect username or password, please try again" });
      return;
    }
    const validPassword = await user.checkPassword(password);
    if (!validPassword) {
      res
        .status(401)
        .send({ message: "Incorrect username or password, please try again" });
      return;
    }
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
      res.status(200).json({ username: user.username });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update user
// Future State TODO: Add update settings option for password reset

// Delete user session
// Future State TODO: Add option to delete account

module.exports = router;
