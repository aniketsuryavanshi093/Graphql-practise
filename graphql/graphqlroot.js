const Event = require("../models/events");
const User = require("../models/users");
const Booking = require("../models/booking");
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

const singleevent = (id) => {
  return Event.findById(id)
    .then((event) => {
      return {
        ...event?._doc,
        creator: userrelation.bind(this, event?._doc?.creator),
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
    bookings: () => {
      return Booking.find()
        .then((data) => {
          return data?.map((booking) => ({
            ...booking?._doc,
            user: userrelation.bind(this, booking?._doc.user),
            Event: singleevent.bind(this, booking?._doc.Event),
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
    createBooking: async ({ bookingInput }) => {
      try {
        const res = await Booking.create({
          Event: bookingInput.eventId,
          user: "65151ed8e3d7bed2404ee043",
        });
        return {
          ...res._doc,
          user: userrelation.bind(this, "65151ed8e3d7bed2404ee043"),
          Event: singleevent.bind(this, bookingInput.eventId),
        };
      } catch (error) {
        throw error;
      }
    },
    cancelBooking: async ({ bookingInput }) => {
      try {
        const res = await Booking.findById(bookingInput.eventId);
        await Booking.findOneAndDelete(bookingInput.eventId);
        return {
          ...res._doc,
          user: userrelation.bind(this, res._doc.user),
          Event: singleevent.bind(this, res._doc.Event),
        };
      } catch (error) {
        throw error;
      }
    },
  },
};
