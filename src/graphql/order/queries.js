// query Query {
//   getAllOrders {
//     _id
//     userId
//     orderItems {
//       price
//       image
//       qty
//       name
//       productId
//     }
//     shippingAddress
//     isPaid
//     totalPrice
//     paidAt
//     isDelivered
//     deliveredAt
//   }
// }

// query Query($getOrderByIdId: ID!) {
//   getOrderById(id: $getOrderByIdId) {
//     totalPrice
//     isPaid
//     isDelivered
//     _id
//     orderItems {
//       name
//       qty
//       image
//       price
//       productId
//     }
//     userId {
//       name
//       _id
//     email
//     }
//     paidAt
//   shippingAddress
//   }
// }

// query Query {
//   getMyOrders {
//     totalPrice
//     isPaid
//     isDelivered
//     _id
//     orderItems {
//       name
//       image
//     qty
//       productId
//       price
//     }
//     paidAt
//   shippingAddress
//     userId {
//       name
//       email
//       _id
//     }
//   }
// }
