import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import Loader from '../../components/Loader'
import { LOGIN_USER } from '../../graphql/user/mutations'
import { userInfoState } from '../../store/login'
import './loginCss.scss'

const Login = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)
  const [formData, setFormData] = useState({
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
      {loading ? (
        <Loader />
      ) : (
        <Container className="form-container">
          <Form
            className="login-form align-self-baseline"
            onSubmit={handleLogin}
          >
            <Form.Label
              className="align-self-baseline font-weight-bold"
              htmlFor="email"
            >
              Email
            </Form.Label>
            <Form.Control
              className="w-100 m-2 mb-4"
              type="email"
              placeholder="enter email"
              name="email"
              minLength="4"
              value={email}
              onChange={(e) => onChange(e)}
            ></Form.Control>
            <Form.Label
              className="align-self-baseline font-weight-bold mt-2"
              htmlFor="password"
            >
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
            <Button
              type="submit"
              variant="primary"
              className="w-100 mt-4 lspace-small"
            >
              Login
            </Button>
            <h6 className="my-2">
              Don't have an account? <Link to={'/register'}>Sign up </Link>
            </h6>
            <div>
              <Button
                variant="primary"
                className=" my-2 mx-1"
                onClick={() => {
                  setFormData({
                    email: 'name1@hstore.com',
                    password: '1212'
                  })
                }}
              >
                Populate Customer values
              </Button>
              <Button
                variant="primary"
                className="my-2 mx-1"
                onClick={() => {
                  setFormData({
                    email: 'adminproducts@hstore.com',
                    password: 'admin1212'
                  })
                }}
              >
                Populate Admin values
              </Button>
            </div>
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
      )}
    </>
  )
}

export default Login
