import { atom } from 'recoil'

export const userInfoState = atom({
  key: 'userInfoState',
  default: {
    userId: null,
    // isAuthenticated: localStorage.getItem('userToken') ? true : false,
    // isAuthenticated: true,
    isAuthenticated: false,

    isAdmin: false,
    token: null,
    name: '',
    email: ''
  }
})
