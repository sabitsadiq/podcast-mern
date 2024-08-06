import User from "../models/user.js";
import { createJwt } from "../utils/index.js";

export const signUp = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const userExit = await User.findOne({ email });
    if (userExit) {
      return res
        .status(400)
        .json({ status: false, message: "User already exist" });
    }
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      //   isAdmin ? createJwt(res, user._id) : null;
      user.password = undefined;
      res.status(201).json(user);
    }
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid email or password." });
    }

    const isMatch = await user.matchPassword(password);
    if (user && isMatch) {
      createJwt(res, user._id);
      user.password = undefined;
      return res.status(200).json(user);
    } else {
      return res
        .status(401)
        .json({ status: false, message: "Invalid credentials" });
    }
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};
