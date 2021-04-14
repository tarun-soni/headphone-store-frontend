import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Redirect, useHistory } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { LOGIN_USER } from '../../graphql/user/mutations'

import { userInfoState } from '../../store/login'
import './loginCss.scss'

const Login = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)
  const [formData, setFormData] = useState({
    // email: 'admin1@hstore.com',
    // password: '1212'
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [LoginMutation] = useMutation(LOGIN_USER)
  const { email, password } = formData

  const history = useHistory()
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleLogin = (e) => {
    e.preventDefault()
    setLoading(true)
    LoginMutation({
      variables: {
        email,
        password
      }
    })
      .then((res) => {
        setLoading(false)

        if (res.data.login) {
          console.log(`res.data`, res.data)

          setUserInfo({
            userId: res.data.login._id,
            isAuthenticated: true,
            isAdmin: res.data.login.isAdmin,
            name: res.data.login.name,
            email: res.data.login.email
          })
          localStorage.setItem('loginStatus', true)
          // localStorage.setItem('email', res.data.login.email)
          localStorage.setItem('accessToken', res.data.login.token)
          // localStorage.setItem('userId', res.data.login._id)
          // localStorage.setItem('isAdmin  ', res.data.login.isAdmin)
          history.replace('/homescreen')
        }
      })
      .catch((error) => {
        setLoading(false)
        setUserInfo({
          userId: null,
          isAuthenticated: false,
          isAdmin: false,
          name: null,
          email: null
        })
        console.log(error)
      })
  }

  if (userInfo.isAuthenticated) {
    return <Redirect to="/homescreen" />
  }

  return (
    <>
      <Container className="form-container">
        <Form className="login-form align-self-baseline" onSubmit={handleLogin}>
          <Form.Label className='align-baseline"'>Email</Form.Label>
          <Form.Control
            className="w-100 m-2 mb-4"
            type="email"
            placeholder="enter email"
            name="email"
            minLength="4"
            value={email}
            onChange={(e) => onChange(e)}
          ></Form.Control>
          <Form.Label className="align-self-baseline" htmlFor="email">
            Password
          </Form.Label>
          <Form.Control
            className="w-100 m-2"
            type="password"
            placeholder="Password"
            name="password"
            minLength="4"
            value={password}
            onChange={(e) => onChange(e)}
          ></Form.Control>
          <Button type="submit" variant="success" className="w-100 mt-4">
            Login
          </Button>
        </Form>
        <div className="features">
          <div className="feature">
            <i className="fas fa-headphones"></i>
            <h4>Buy Premium Headphones</h4>
            <p>Have an awesome Experience</p>
          </div>
          <div className="feature">
            <i className="fa fa-check-circle" aria-hidden="true"></i>
            <h4>Sign up and Login</h4>
            <p>Login to see and edit all notes.</p>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Login
