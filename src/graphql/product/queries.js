import gql from 'graphql-tag'

export const GET_TOP_RATED_PRODS = gql`
  query getTopRatedProducts {
    getTopRatedProducts {
      _id
      name
      image
      description
      rating
      price
      countInStock
      colors
    }
  }
`
export const GET_ALL_PRODUCTS = gql`
  query getAllProducts {
    getAllProducts {
      _id
      name
      image
      description
      rating
      price
      countInStock
      colors
    }
  }
`
