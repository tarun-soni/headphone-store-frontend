import gql from 'graphql-tag'

export const GET_ALL_ORDERS = gql`
  query getAllOrders {
    getAllOrders {
      _id

      orderItems {
        price
        image
        qty
        name
        productId
      }
      userId {
        name
        email
        _id
      }
      shippingAddress
      isPaid
      totalPrice
      paidAt
      isDelivered
      deliveredAt
    }
  }
`

export const GET_ORDER_BY_ID = gql`
  query getOrderById($id: ID!) {
    getOrderById(id: $id) {
      totalPrice
      isPaid
      isDelivered
      _id
      orderItems {
        name
        qty
        image
        price
        productId
      }
      userId {
        name
        _id
        email
      }
      paidAt
      shippingAddress
    }
  }
`

export const GET_MY_ORDERS = gql`
  query getMyOrders {
    getMyOrders {
      totalPrice
      isPaid
      isDelivered
      _id
      # deliveredAt
      orderItems {
        name
        image
        qty
        productId
        price
      }
      paidAt
      shippingAddress
      userId {
        name
        email
        _id
      }
    }
  }
`
