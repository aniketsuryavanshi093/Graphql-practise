const bcrypt = require("bcrypt");
const User = require("../models/users");

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
};
