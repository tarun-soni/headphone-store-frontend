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
    $createUserName: String!
    $createUserEmail: String!
    $createUserPassword: String!
  ) {
    createUser(
      name: $createUserName
      email: $createUserEmail
      password: $createUserPassword
    ) {
      _id
      name
      email
      password
      isAdmin
    }
  }
`
