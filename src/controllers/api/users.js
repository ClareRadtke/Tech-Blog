const { User } = require("../../models");
const router = require("express").Router();

// Create new user
router.post("/", async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = (
      await User.create({
        name,
        password,
      })
    ).get({ plain: true });
    if (user) {
      req.session.save(() => {
        req.session.user_id = user.id;
        req.session.logged_in = true;
        res.status(200).json({ name });
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Read user id
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
        .send({ message: "Incorrect email or password, please try again" });
      return;
    }
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
      res.status(200).json({ email, name: user.name });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Update user
// TODO: add update settings option for password reset

// Delete user session

module.exports = router;
