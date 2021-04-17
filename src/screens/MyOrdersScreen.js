import { Form, Row, Col, Button, Table, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import BackButton from '../components/BackButton'
import Loader from '../components/Loader'
import { useQuery } from '@apollo/client'
import { GET_MY_ORDERS } from '../graphql/order/queries'
import { useEffect, useState } from 'react'
import { getDate } from '../getDate'

const MyOrdersScreen = () => {
  const [orders, setOrders] = useState([])
  const { loading: loadingOrders, data, error: errorOrders } = useQuery(
    GET_MY_ORDERS
  )

  useEffect(() => {
    setOrders(data?.getMyOrders)
  }, [data?.getMyOrders])

  return (
    <Container>
      <BackButton to="/" />
      <Row className="m-3">
        <Col>
          <h3>My Orders</h3>

          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <>{console.log(`errorOrders`, errorOrders)}</>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead className="text-center">
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Delivered</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => (
                  <tr key={order._id} className="text-center">
                    <td>{order._id}</td>
                    <td>{order?.paidAt && getDate(String(order.paidAt))}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: '#eb5a46' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt
                      ) : (
                        <i
                          className="fas fa-times "
                          style={{ color: '#eb5a46' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className="btn-sm" variant="light">
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default MyOrdersScreen
