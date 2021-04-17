import gql from 'graphql-tag'

export const DELETE_PRODUCT = gql`
  mutation deleteMutation($id: ID) {
    deleteProduct(id: $id) {
      status
      message
    }
  }
`
