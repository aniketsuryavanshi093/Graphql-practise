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
    type AuthData{
        userId: ID!
        token: String!
        expiresIn: String
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
    type AuthError {
        message: String!
        statusCode: Int!
      }
    input bookingInput{
        eventId: String!
    }
    input loginInput{
        email: String!
        password: String!
    }
    type rootQuery{
        events: [Event!]
        bookings: [Booking!]
        getUser: User!
        login(loginInput: loginInput): AuthData 
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
