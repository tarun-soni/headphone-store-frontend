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
const API_URL = 'http://localhost:4000/graphql'

console.log(`${API_URL}`)

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
        .get(`http://localhost:4000/api/users/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        })
        .then((res) => {
          console.log('Token Check Success')

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
  }, [])

  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  )
}

export default App
