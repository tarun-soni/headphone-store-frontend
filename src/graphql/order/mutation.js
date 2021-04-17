import gql from 'graphql-tag'

export const CREATE_ORDER = gql`
  mutation createOrder(
    $userId: String
    $totalPrice: Int!
    $orderItems: [OrderItemInput]
    $shippingAddress: String
    $isPaid: Boolean
    $paidAt: String
  ) {
    createOrder(
      userId: $userId
      totalPrice: $totalPrice
      orderItems: $orderItems
      shippingAddress: $shippingAddress
      isPaid: $isPaid
      paidAt: $paidAt
    ) {
      userId
      orderItems {
        name
        qty
        image
        price
        productId
      }
      shippingAddress
      totalPrice
      isPaid

      paidAt
    }
  }
`
