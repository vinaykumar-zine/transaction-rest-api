import passport from "passport";
import User from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { username, email, mobile } = req.body;

  const newUser = new User({
    username,
    email,
    mobile,
  });

  try {
    await User.register(
      newUser,
      req.body.password,
      function (err, createdUser) {
        if (err) {
          res.status(400).json({ message: err.message });
        } else {
          passport.authenticate("local")(req, res, function () {
            res.status(201).json({
              customerId: req.user._id,
              username: req.user.username,
              email: req.user.email,
              mobile: req.user.mobile,
              joinedOn: req.user.createdAt,
            });
          });
        }
      }
    );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  res.status(200).json({
    customerId: req.user._id,
    username: req.user.username,
    email: req.user.email,
    mobile: req.user.mobile,
    joinedOn: req.user.createdAt,
  });
};
