const { buildSchema } = require("graphql");

const graphqlschema = buildSchema(`
    type Event{
        _id: ID!
        title: String!
        description: String!
        date: String!
        price: Float!
        creator: User
    }
    type Booking{
        _id: ID!
        createdAt: String
        updatedAt: String
        user: User
        Event: Event
    }
    type User{
        _id: ID!
        email: String!
        createdEvent: [Event!]
        createdAt: String
        updatedAt: String
    }
    input EventInput{
        title: String!
        description: String!
        date: String!   
        price: Float!
    }
    input UserInput{
        email: String!
        password: String!
    }
    input bookingInput{
        eventId: String!
    }
    type rootQuery{
        events: [Event!]
        bookings: [Booking!]
    }
    type rootMutation{
        createEvents(eventInput: EventInput): Event
        createUser(userInput: UserInput): User
        createBooking(bookingInput: bookingInput): Booking
        cancelBooking(bookingInput: bookingInput): Booking
    }
    schema{
        query: rootQuery
        mutation: rootMutation
    }
`);

module.exports = {
  graphqlschema,
};