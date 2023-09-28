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
  createEvents: async ({ eventInput }) => {
    try {
      const result = {
        title: eventInput.title,
        description: eventInput.description,
        date: eventInput.date,
        price: +eventInput.price,
        creator: "65151ed8e3d7bed2404ee043",
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
