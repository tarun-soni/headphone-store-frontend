import gql from 'graphql-tag'

export const GET_CURRENT_USER = gql`
  query Query {
    getCurrentUser {
      _id
      name
      email
      isAdmin
    }
  }
`
