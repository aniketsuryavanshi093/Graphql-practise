const authResolver = require("../resolvers/auth");
const eventResolver = require("../resolvers/events");
const bookingResolver = require("../resolvers/booking");

module.exports = {
  graphqlroots: {
    ...bookingResolver,
    ...authResolver,
    ...eventResolver,
  },
};
