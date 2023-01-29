const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "Invalid user details, Please check and try again." });
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res
      .status(401)
      .json({ message: "User with this email does not exist." });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: "Incorrect email or password." });
  }

  const token = jwt.sign(
    { _id: user._id, name: user.name, email: user.email },
    process.env.SECRET_OR_KEY,
    {
      expiresIn: 60000,
    }
  );

  res.json({ Token: "Bearer " + token });
});

const validate = (req) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return Joi.attempt(req, schema, "User validation error");
};

module.exports = router;
