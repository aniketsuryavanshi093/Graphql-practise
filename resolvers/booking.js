const Booking = require("../models/booking");

const { transformBooking } = require("./merge");
module.exports = {
  createBooking: async ({ bookingInput }) => {
    try {
      const res = await Booking.create({
        Event: bookingInput.eventId,
        user: "65151ed8e3d7bed2404ee043",
      });
      return transformBooking(res, {
        Event: bookingInput.eventId,
        user: "65151ed8e3d7bed2404ee043",
      });
    } catch (error) {
      throw error;
    }
  },
  cancelBooking: async ({ bookingInput }) => {
    try {
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
  bookings: () => {
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
