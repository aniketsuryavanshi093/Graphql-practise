import { gql } from "@apollo/client";

export const LOGIN_QUERY = gql`
  query Login($email: String!, $password: String!) {
    login(loginInput: { email: $email, password: $password }) {
      userId
      token
      expiresIn
    }
  }
`;

export const CREATE_EVENT = gql`
mutation CreateEvents($eventInput: EventInput!) {
  createEvents(eventInput: $eventInput) {
    _id
    title
    description
    date
    price
    creator {
      _id
      email
    }
  }
}
`