import { useEffect, useState } from 'react'
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  Container
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import BackButton from '../components/BackButton'
import CustomToast from '../components/CustomToast'
import { cartState } from '../store/cart'

const CartScreen = () => {
  const [cart, setCart] = useRecoilState(cartState)
  const [cartToDisplay] = useState(JSON.parse(localStorage.cartItems))
  useEffect(() => {
    console.log(`cart`, cart)
    console.log(`localStorage.cart`, JSON.parse(localStorage.cartItems))
  }, [])

  const removeFromCartHandler = (id) => {
    setCart({
      ...cart,
      cartItems: cart.cartItems.filter((x) => x.product !== id)
    })
    localStorage.setItem('cartItems', JSON.stringify(cart))
  }
  const checkoutHandler = () => {}
  return (
    <>
      <Container className="my-5 mx-6">
        <h3>Shopping Cart</h3>
        <BackButton to="/" />
        <Row>
          <Col md={8}>
            {cart.cartItems.length === 0 ? (
              <>
                <CustomToast variant="info" msg="NO items in cart" />
              </>
            ) : (
              <ListGroup variant="flush">
                {cart.cartItems.map((item) => (
                  <ListGroup.Item key={item.product}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={4}>
                        <h5>
                          <Link
                            to={`/product/${item.product}`}
                            className="text-white"
                          >
                            {item.name}
                          </Link>
                        </h5>
                      </Col>
                      <Col md={2}>
                        <h4>${item.price} </h4>
                      </Col>
                      <Col md={2}>
                        <Form.Control
                          as="select"
                          value={item.qty}
                          // onChange={(e) =>
                          //
                          // }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col md={2}>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal (
                    {cart.cartItems.reduce(
                      (acc, item) => acc + Number(item.qty),
                      0
                    )}
                    ) items
                  </h3>
                  $
                  {cart.cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={cart.cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>{' '}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default CartScreen
