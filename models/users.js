const mongoose = require("mongoose");

const schema = mongoose.Schema;

const users = new schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdEvent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", users);
