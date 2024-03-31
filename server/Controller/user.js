import { hashUserPassword, varifyPassword } from "../Authentication/bcrypt.js";
import { generateJwtToken } from "../config/genetareJWTtoken.js";
import User from "../Model/User.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    if (name && email && mobile && password) {
      const alreadyRegistedUser = await User.findOne({
        $or: [{ email, mobile }],
      });

      if (!alreadyRegistedUser) {
        const hashPassword = await hashUserPassword(password);
        const user = new User({ name, email, mobile, password: hashPassword });
        user.save();
        const token = await generateJwtToken(user._id);

        res.status(201).json({ user, token });
      } else {
        res.status(400).json({ message: "User already exists!" });
      }
    } else {
      res.status(400).json({ message: "All inputs required!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const deleteUserAccount = async (req, res) => {
  try {
    const { _id } = req.user;
    if (_id) {
      const userExists = await User.findById(_id);
      if (userExists) {
        await User.findByIdAndDelete(_id);
        res.status(200).json({ message: "User deleted succesfully!" });
      } else {
        res.status(404).json({ message: "User not found!" });
      }
    } else {
      res.status(401).json({ message: "User is not authorized!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const getUser = async (req, res) => {
  try {
    const { _id } = req.user;

    if (_id) {
      const user = await User.findById(_id).select({
        name: 1,
        email: 1,
        mobile: 1,
        orders: 1,
        cart: 1,
        _id: 0,
      });
      res.status(200).json({ user });
    } else {
      res.status(401).json("Unauthorize user!");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};
export const loginUser = async (req, res) => {
  try {
    const { value, password } = req.body;

    if (value.includes("@")) {
      const user = await User.findOne({ email: value });
      if (user) {
        const varify = await varifyPassword(user.password, password);

        if (varify) {
          const token = await generateJwtToken(user._id);
          res.status(200).json({ user, token });
        } else {
          res.status(401).json({ message: "Unauthorized user!" });
        }
      } else {
        res.status(404).json({ message: "User not found!" });
      }
    } else if (value.length === 10) {
      const user = await User.findOne({ mobile: value });
      if (user) {
        const vaifry = await varifyPassword(user.password, password);
        if (vaifry) {
          const token = await generateJwtToken(user._id);
          res.status(200).json({ user, token });
        } else {
          res.status(401).json({ message: "Unauthorized user!" });
        }
      } else {
        res.status(404).json({ message: "User not found!" });
      }
    } else {
      res
        .status(400)
        .json({ message: "Password or email/mobile number not valid!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const addFeedBacks = async (req, res) => {
  try {
    const { _id } = req.user;
    const { feedback, feedbackType } = req.body;

    if (feedback && feedbackType) {
      await User.findByIdAndUpdate(_id, {
        $push: { feedbacks: { feedback, feedbackType } },
      });
      res.status(200).json({ message: "Feedback added successfully!" });
    } else {
      res.status(400).json({ message: "All inputs required!" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
