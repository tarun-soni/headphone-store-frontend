import gql from 'graphql-tag'

export const LOGIN_USER = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      name
      email
      isAdmin
      token
    }
  }
`
export const CREATE_USER = gql`
  mutation CreateUserMutation(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(name: $name, email: $email, password: $password) {
      _id
      name
      email
      isAdmin
    }
  }
`
