const Booking = require("../models/booking");

const { transformBooking } = require("./merge");
module.exports = {
  createBooking: async ({ bookingInput }, req) => {
    try {
      if (!req.isAuth) {
        throw Error("User not Authenticated");
      }
      const res = await Booking.create({
        Event: bookingInput.eventId,
        user: req.userId,
      });
      return transformBooking(res, {
        Event: bookingInput.eventId,
        user: req.userId,
      });
    } catch (error) {
      throw error;
    }
  },
  cancelBooking: async ({ bookingInput }, req) => {
    try {
      if (!req.isAuth) {
        throw Error("User not Authenticated");
      }
      const res = await Booking.findById(bookingInput.eventId);
      await Booking.findOneAndDelete(bookingInput.eventId);
      return transformBooking(res, {
        user: res._doc.user,
        Event: res._doc.Event,
      });
    } catch (error) {
      throw error;
    }
  },
  bookings: (args, req) => {
    if (!req.isAuth) {
      throw Error("User not Authenticated");
    }
    return Booking.find()
      .then((data) => {
        return data?.map((booking) =>
          transformBooking(booking, {
            user: booking?._doc.user,
            Event: booking?._doc.Event,
          })
        );
      })
      .catch((er) => {
        throw er;
      });
  },
};
