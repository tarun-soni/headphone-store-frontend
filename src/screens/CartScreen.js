import { useMutation } from '@apollo/client'
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
import { Link, useHistory } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import BackButton from '../components/BackButton'
import CustomToast from '../components/CustomToast'
import Loader from '../components/Loader'
import { CREATE_ORDER } from '../graphql/order/mutation'
import { GET_MY_ORDERS } from '../graphql/order/queries'
import { cartState, orderDoneState } from '../store/cart'
import { userInfoState } from '../store/login'

const CartScreen = () => {
  const history = useHistory()

  const [, setOrderDone] = useRecoilState(orderDoneState)
  const [loading, setLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const [cart, setCart] = useRecoilState(cartState)
  const [userInfo] = useRecoilState(userInfoState)
  const [createOrder] = useMutation(CREATE_ORDER)
  const removeFromCartHandler = (id) => {
    setCart({
      ...cart,
      cartItems: cart.cartItems.filter((x) => x.product !== id)
    })
  }
  const placeOrderHandler = () => {
    let today = new Date()
    let dd = String(today.getDate()).padStart(2, '0')
    let mm = String(today.getMonth() + 1).padStart(2, '0')
    let yyyy = today.getFullYear()
    today = dd + mm + yyyy

    let _orderItems = []
    cart.cartItems.map((item) => {
      return _orderItems.push({
        qty: Number(item.qty),
        name: item.name,
        image: item.image,
        productId: item.product,
        price: item.price
      })
    })

    createOrder({
      variables: {
        userId: userInfo.userId,
        totalPrice: Number(totalPrice),
        orderItems: _orderItems,
        shippingAddress: cart.shippingAddress,
        isPaid: true,
        paidAt: today
      },
      refetchQueries: [
        {
          query: GET_MY_ORDERS,
          variables: { id: userInfo.userId }
        }
      ]
    })
      .then((res) => {
        setLoading(false)
        setOrderDone(true)
        history.push('/myorders')
        setCart({
          ...cart,
          cartItems: []
        })
      })
      .catch((error) => {
        setLoading(false)
        console.log(error)
      })
  }
  useEffect(() => {
    setTotalPrice(
      cart.cartItems
        .reduce((acc, item) => acc + item.qty * item.price, 0)
        .toFixed(2)
    )
  }, [cart])
  return (
    <Container className="my-5 mx-6">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h3>Shopping Cart</h3>
          <BackButton to="/" />
          <Row>
            <Col md={8}>
              {cart.cartItems.length === 0 ? (
                <CustomToast variant="info" msg="NO items in cart" />
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems?.map((item) => (
                    <ListGroup.Item key={item.product}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
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
                          <h4>{item.price} </h4>
                        </Col>

                        <Col md={2}>
                          <h4> x {item.qty} </h4>
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
                      {cart?.cartItems !== [] &&
                        cart?.cartItems?.reduce(
                          (acc, item) => acc + Number(item.qty),
                          0
                        )}
                      ) items
                    </h3>
                    <h3 className="lspace-small">??? {totalPrice}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Form>
                      <Form.Group controlId="address">
                        <Form.Label>Shipping Address</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter address"
                          value={cart.shippingAddress}
                          required
                          onChange={(e) =>
                            setCart({
                              ...cart,
                              shippingAddress: e.target.value
                            })
                          }
                        ></Form.Control>
                      </Form.Group>
                    </Form>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn-block"
                      disabled={cart.cartItems.length === 0}
                      onClick={placeOrderHandler}
                    >
                      Place Order
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>{' '}
            </Col>
          </Row>
        </>
      )}
    </Container>
  )
}

export default CartScreen
