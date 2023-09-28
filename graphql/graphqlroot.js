const Event = require("../models/events");
const User = require("../models/users");
const bcrypt = require("bcrypt");

const eventsrelation = async (eventsid) => {
  return Event.find({ _id: { $in: eventsid } })
    .then((data) => {
      return data?.map((events) => ({
        ...events?._doc,
        creator: userrelation.bind(this, events._doc.creator),
      }));
    })
    .catch((Er) => {
      throw Error(Er);
    });
};

const userrelation = (id) => {
  return User.findById(id)
    .then((user) => {
      return {
        ...user?._doc,
        createdEvent: eventsrelation.bind(this, user?._doc?.createdEvent),
      };
    })
    .catch((err) => {
      throw Error(err);
    });
};

module.exports = {
  graphqlroots: {
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
  },
};
