import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import Routes from './Routes'

import { useEffect } from 'react'
import axios from 'axios'
import { userInfoState } from './store/login'
import { useRecoilState } from 'recoil'
const API_URL = `${process.env.REACT_APP_BACKEND_URL}/graphql`
const httpLink = createHttpLink({
  uri: API_URL
})

const authLink = setContext((_, { headers }) => {
  const accessToken = localStorage.getItem('accessToken')
  return {
    headers: {
      ...headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true
})

function App() {
  const [, setUserInfo] = useRecoilState(userInfoState)

  useEffect(() => {
    if (localStorage.getItem('loginStatus') === 'true') {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        })
        .then((res) => {
          setUserInfo({
            userId: res.data._id,
            isAuthenticated: true,
            isAdmin: res.data.isAdmin,
            name: res.data.name,
            email: res.data.email
          })
        })
        .catch((err) => {
          console.log('Token Check Failed:', err)
          window.location.replace('/logout')
        })
    }
    //eslint-disable-next-line
  }, [])

  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  )
}

export default App
