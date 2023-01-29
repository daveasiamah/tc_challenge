const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const User = require("../../models/User");

// const { registerValidation } = require("../../utils/validation");

// @route    POST api/register
// @desc     register a user
// @access   public
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  //Check if email exists in db
  const userExists = await User.findOne({ email: email });
  if (userExists)
    return res.status(400).json({ message: "This user already exists." });

  //Hash user password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Get User avatar from email
  const avatar = gravatar.url(
    email,
    {
      s: "200", //Size
      r: "pg", //Rating
      d: "mm", //Default
    },
    true
  );

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    avatar,
  });

  newUser
    .save()
    .then((doc) =>
      res.status(201).json({
        message: "User created",
        doc,
      })
    )
    .catch((err) => res.send(err));
});

module.exports = router;
