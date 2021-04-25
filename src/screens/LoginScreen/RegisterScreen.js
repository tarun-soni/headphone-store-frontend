import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'

import { Link, Redirect, useHistory } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import CustomToast from '../../components/CustomToast'
import Loader from '../../components/Loader'
import { CREATE_USER } from '../../graphql/user/mutations'
import { userInfoState } from '../../store/login'

const RegisterScreen = () => {
  const [userInfo] = useRecoilState(userInfoState)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const { name, email, password } = formData
  const [createUserMutaion] = useMutation(CREATE_USER)
  const [isRegisterSuccessFull, setIsRegisterSuccessFull] = useState(false)
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    createUserMutaion({
      variables: {
        name,
        email,
        password
      }
    })
      .then((res) => {
        if (res?.data?.createUser) {
          setIsRegisterSuccessFull(true)
        }
      })
      .catch((err) => {
        console.log(`err`, err)
      })
    setLoading(false)
  }
  if (userInfo.isAuthenticated || localStorage.getItem('userToken')) {
    return <Redirect to="/homescreen" />
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container
          className="form-container"
          style={{
            marginTop: '7rem',
            backgroundColor: '#111',
            height: '50vh'
          }}
        >
          {isRegisterSuccessFull && (
            <CustomToast
              msg="REGISTRATION SUCCESSFULL, NOW YOU CAN LOGIN"
              variant="success"
              onClose={() => setIsRegisterSuccessFull(false)}
            />
          )}
          <Form className="login-form" onSubmit={onSubmit}>
            <Form.Label
              className="align-self-baseline font-weight-bold"
              htmlFor="name"
            >
              Name
            </Form.Label>

            <Form.Control
              className="w-100 m-1"
              type="text"
              placeholder="Enter your Name"
              name="name"
              id="name"
              value={name}
              onChange={(e) => onChange(e)}
            />

            <Form.Label
              className="align-self-baseline font-weight-bold"
              htmlFor="email"
            >
              Email
            </Form.Label>
            <Form.Control
              className="w-100 m-1"
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
              className="w-100 m-1"
              type="password"
              placeholder="Password"
              name="password"
              minLength="4"
              value={password}
              onChange={(e) => onChange(e)}
            ></Form.Control>
            <Button
              type="submit"
              variant="success"
              className="w-100 mt-4 lspace-small"
            >
              Register
            </Button>
            <h6 className="my-2">
              Have have an account? <Link to={'/login'}>Login </Link>
            </h6>
          </Form>
        </Container>
      )}
    </>
  )
}

export default RegisterScreen
