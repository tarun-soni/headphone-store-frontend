import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { GET_ORDER_BY_ID } from '../graphql/order/queries'
import Loader from '../components/Loader'
import { useRecoilState } from 'recoil'
import { userInfoState } from '../store/login'

import { Col, ListGroup, Image, Card, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const OrderScreen = () => {
  const [orderData, setOrderData] = useState([])
  const { orderid } = useParams()
  const [userInfo] = useRecoilState(userInfoState)

  const { loading, error, data } = useQuery(GET_ORDER_BY_ID, {
    variables: {
      id: orderid
    }
  })

  useEffect(() => {
    setOrderData(data?.getOrderById)
    console.log(` data?.getOrderById`, data?.getOrderById)
  }, [data])

  return loading ? (
    <Loader />
  ) : error ? (
    <></>
  ) : (
    // <Message variant="danger">{error}</Message>
    <div style={{ margin: '2rem 8rem' }}>
      <Link
        to={userInfo?.isAdmin ? '/admin/orderlist' : '/myorders'}
        className="btn btn-light my-3 "
      >
        <i className="fas fa-arrow-left mr-2" aria-hidden="true"></i>
        Back
      </Link>

      <h3>Order {orderData?._id}</h3>

      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {orderData?.userId?.name}
              </p>
              <p>
                <strong>Email: </strong> {orderData?.user?.email}
              </p>
              <p>
                <strong>Address:</strong>
                {orderData?.shippingAddress}
              </p>
              {orderData?.isDelivered ? (
                <h4>Delivered on {orderData?.deliveredAt}</h4>
              ) : (
                <h3>Not Delivered</h3>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h3>Payment </h3>

              {orderData?.isPaid ? (
                <h4>Paid on {orderData?.paidAt}</h4>
              ) : (
                <h4>Not Paid</h4>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h3>order Items</h3>
              {orderData?.orderItems?.length === 0 ? (
                <h4>Order is empty</h4>
              ) : (
                <ListGroup variant="flush">
                  {orderData?.orderItems?.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.productId}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          <ListGroup.Item className="lspace-small">
                            {item.qty} x ${item.price} = $
                            {(item.qty * item.price).toFixed(2)}
                          </ListGroup.Item>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card className="lspace">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>Order Summary</h3>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${orderData?.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
export default OrderScreen
