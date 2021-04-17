import React, { useEffect } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useRecoilState } from 'recoil'
import { userInfoState } from '../store/login'
import { plsLoginAlert } from '../store/alerts'
import CustomToast from './CustomToast'
const Header = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)
  const [showPlsLoginAlert, setShowPlsLoginAlert] = useRecoilState(
    plsLoginAlert
  )

  const logoutHandler = () => {
    window.location.replace('/logout')
  }

  return (
    <>
      <Navbar
        className="font-weight-bold"
        bg="light"
        expand="lg"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Headphone Store</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {userInfo?.isAuthenticated && (
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <i className="fas fa-shopping-cart px-1"></i>
                    VIEW MY CART
                  </Nav.Link>
                </LinkContainer>
              )}

              {userInfo.isAuthenticated && !userInfo.isAdmin ? (
                <NavDropdown title={userInfo.name.toUpperCase()} id="username">
                  <LinkContainer to="/myorders">
                    <NavDropdown.Item>My Orders</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : userInfo.isAdmin ? (
                <></>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user px-1"></i>
                    SIGN IN
                  </Nav.Link>
                </LinkContainer>
              )}

              {userInfo?.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>All Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>All Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/logout">
                    <NavDropdown.Item>LOGOUT</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
export default Header
