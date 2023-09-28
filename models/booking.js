const mongoose = require("mongoose");

const schema = mongoose.Schema;
const booking = new schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    Event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", booking);
