const User = require("../models/User");
const jwt = require("jsonwebtoken");
const secretOrKey = process.env.JWT_SECRET;

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).sort({ date_created: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      result: users.map((doc) => {
        return {
          _id: doc._id,
          name: doc.name,
          email: doc.email,
          role: doc.role,
          avatar: doc.avatar,
        };
      }),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: err });
  }
};

exports.getCurrentUser = async (req, res) => {
  const authToken = req.headers.authorization.split(" ")[1];
  let decoded;
  try {
    decoded = jwt.verify(authToken, secretOrKey);
    res.status(200).json({ success: true, currentUser: decoded });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const result = await User.findOne({ _id: req.params.id });
    if (result) res.status(200).json({ success: true, result });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, error: err.toString() });
  }
};

exports.updateUser = (req, res) => {
  User.updateOne({ _id: req.params.id }, req.body)
    .then((result) =>
      res.json({ success: true, message: "Updated successfuly", result })
    )
    .catch((err) =>
      res
        .status(400)
        .json({ success: false, message: "Error Updating item", err })
    );
};

exports.deleteUser = (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then((result) => {
      result.deletedCount
        ? res.status(200).json({ message: "Deleted Successfully." })
        : res.status(400).json({ message: "Could not delete." });
    })
    .catch((err) =>
      res
        .status(400)
        .json({ error: err, success: false, message: "Error Deleting." })
    );
};
