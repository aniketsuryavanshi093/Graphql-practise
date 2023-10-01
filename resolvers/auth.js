const bcrypt = require("bcrypt");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
module.exports = {
  createUser: async ({ userInput }) => {
    try {
      const user = await User.findOne({ email: userInput.email });
      if (user) {
        throw Error("User already exists");
      }
      const hashpass = await bcrypt.hash(userInput.password, 10);
      const result = {
        email: userInput.email,
        password: hashpass,
      };
      const data = await User.create({
        ...result,
      });
      return data._doc;
    } catch (error) {
      throw error;
    }
  },
  getUser: async (args, req) => {
    if (!req.isAuth) {
      throw Error("Unauthenticated");
    }
    const user = await User.findById(req.userId);
    if (!user) {
      throw Error("User not Exist");
    }
    return user?._doc;
  },
  login: async ({ loginInput }) => {
    const user = await User.findOne({ email: loginInput.email });
    if (!user) {
      throw Error("User not Exist");
    }
    const isEqual = await bcrypt.compare(
      loginInput.password,
      user?._doc?.password
    );

    if (!isEqual) {
      throw Error("Invalid Credential");
    }

    const jwtres = jwt.sign(
      {
        email: user?._doc?.email,
        userId: user._doc._id,
      },
      "supersecret",
      {
        expiresIn: "2h",
      }
    );

    return { token: jwtres, userId: user._doc._id, expiresIn: 1 };
  },
};
