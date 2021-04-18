import { atom } from 'recoil'

export const cartState = atom({
  key: 'cartState',

  default: {
    cartItems: [],
    shippingAddress: 'some random address'
  }
})

export const orderDoneState = atom({
  key: 'orderDoneState',
  default: false
})
