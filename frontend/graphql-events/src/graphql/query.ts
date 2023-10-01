import { gql } from "@apollo/client";

export const GET_LOGIN_DETAIL = gql`
query GetUser {
    getUser {
        _id
        email
        createdAt
        updatedAt
    }
}
`
export const GET_EVENTS = gql`
query
{
  events{
    _id
    title
    description
    date
    price
    creator{
      email
      _id
    }
  }
}`