// Import the Router class from express.
const bcrypt = require("bcrypt");
const { Router } = require("express");

//Import the corresponding model.
const User = require("../models").user;

//Instantiate a router.
const router = new Router();

//Register a GET / route that responds with all the users.
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body;
    if (!email || !password || !fullName) {
      res.status(400).send("missing information");
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = await User.create({
        email,
        password: hashedPassword,
        fullName
      });
      res.json(newUser);
    }
  } catch (e) {
    next(e);
  }
});

//Export the router.
module.exports = router;
