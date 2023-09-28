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
type User{
    _id: ID!
    email: String!
    createdAt: String
    createdEvent: [Event!]
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
type rootQuery{
    events: [Event!]!
}
type rootMutation{
    createEvents(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
}
schema{
    query: rootQuery
    mutation: rootMutation
}
`);

module.exports = {
  graphqlschema,
};
