const User = require("../models/users");
const Event = require("../models/events");

const transformBooking = (res, { user, Event }) => {
  return {
    ...res._doc,
    user: userrelation.bind(this, user),
    Event: singleevent.bind(this, Event),
  };
};

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
  userrelation,
  singleevent,
  eventsrelation,
  transformBooking,
};
