import { atom } from 'recoil'

export const cartState = atom({
  key: 'cartState',

  default: {
    cartItems: [],
    shippingAddress: 'some random address'
  }
})
