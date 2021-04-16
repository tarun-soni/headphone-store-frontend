import { atom } from 'recoil'

export const userInfoState = atom({
  key: 'userInfoState',
  default: {
    userId: null,

    isAuthenticated: false,

    isAdmin: false,
    token: null,
    name: '',
    email: ''
  }
})
