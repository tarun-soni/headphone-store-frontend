import BackButton from '../components/BackButton'
import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Container } from 'react-bootstrap'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_ALL_ORDERS } from '../graphql/order/queries'
import { getDate } from '../getDate'

const AdminOrderList = () => {
  const { loading, data, error } = useQuery(GET_ALL_ORDERS)

  useEffect(() => {
    console.log(`data`, data?.getAllOrders)
  }, [data])

  if (error) console.log(`error`, error)
  return (
    <>
      <Container className="m3">
        <BackButton to="/" />
        <h3>Users</h3>
        {loading ? (
          <Loader />
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead className="text-center">
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.getAllOrders?.map((order) => (
                <tr key={order._id} className="text-center">
                  <td>{order._id}</td>
                  {/* <td>{order.user && order.user.name}</td> */}
                  <td>{order?.userId?.name}</td>
                  <td>{order?.paidAt && getDate(String(order.paidAt))}</td>
                  <td>
                    rupee
                    {order?.totalPrice}
                  </td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td className="d-flex justify-content-sm-around">
                    <LinkContainer to={`/order/${order._id}/edit`}>
                      <Button className="btn-sm" variant="light">
                        Details{' '}
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  )
}

export default AdminOrderList
