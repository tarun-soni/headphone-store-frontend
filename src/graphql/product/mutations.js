import gql from 'graphql-tag'

export const DELETE_PRODUCT = gql`
  mutation deleteMutation($id: ID) {
    deleteProduct(id: $id) {
      status
      message
    }
  }
`
export const CREATE_PRODUCT = gql`
  mutation createProduct(
    $User: ID!
    $Name: String!
    $Image: String
    $Description: String
    $Bgimage: String
    $Rating: Int
    $Price: Int
    $CountInStock: Int
    $Colors: [COLORSENUM!]
  ) {
    createProduct(
      user: $User
      name: $Name
      image: $Image
      description: $Description
      bgimage: $Bgimage
      rating: $Rating
      price: $Price
      countInStock: $CountInStock
      colors: $Colors
    ) {
      _id
    }
  }
`
