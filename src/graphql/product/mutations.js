// mutation CreateOrderMutation($createOrderTotalPrice: Int!, $createOrderOrderItems: [OrderItemInput], $createOrderShippingAddress: String, $createOrderIsPaid: Boolean, $createOrderIsDelivered: Boolean, $createOrderUserId: String) {
//   createOrder(totalPrice: $createOrderTotalPrice, orderItems: $createOrderOrderItems, shippingAddress: $createOrderShippingAddress, isPaid: $createOrderIsPaid, isDelivered: $createOrderIsDelivered, userId: $createOrderUserId) {
//     userId
//     orderItems {
//       name
//       qty
//       image
//       price
//       productId
//     }
//     shippingAddress
//     totalPrice
//     isPaid
//     deliveredAt
//     isDelivered
//     paidAt
//   }
// }
