const User = require("../models/users");
const Event = require("../models/events");
const { userrelation } = require("./merge");

module.exports = {
  events: () => {
    return Event.find()
      .then((data) => {
        return data?.map((events) => ({
          ...events?._doc,
          creator: userrelation.bind(this, events?._doc.creator),
        }));
      })
      .catch((er) => {
        throw er;
      });
  },
  createEvents: async ({ eventInput }, req) => {
    try {
      if (!req.isAuth) {
        throw Error("User not Authenticated");
      }
      const result = {
        title: eventInput.title,
        description: eventInput.description,
        date: eventInput.date,
        price: +eventInput.price,
        creator: req.userId,
      };
      const data = await Event.create({
        ...result,
      });
      await User.findByIdAndUpdate(result.creator, {
        $addToSet: {
          createdEvent: data._doc._id,
        },
      });
      return {
        ...data._doc,
        creator: userrelation.bind(this, result.creator),
      };
    } catch (error) {
      throw error;
    }
  },
};
