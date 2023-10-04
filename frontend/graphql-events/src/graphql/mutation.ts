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

export const CREATE_BOOKING_MUTATION = gql`
mutation CreateBooking($bookingInput: bookingInput!) {
  createBooking(bookingInput: $bookingInput) {
    _id
        createdAt
        updatedAt
        Event {
            _id
            title
            description
            date
            price
            creator {
                _id
                email
                createdAt
                updatedAt
            }
        }
  }
}
`;

export const CANCEL_BOOKING_MUTATION = gql`
  mutation CancelBooking($bookingInput: bookingInput!) {
    cancelBooking(bookingInput: $bookingInput) {
      _id
      createdAt
      updatedAt
      Event {
        _id
        title
        date
        price
      }
    }
  }
`;