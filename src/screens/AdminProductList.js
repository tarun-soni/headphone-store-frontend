import { useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Button, Table, Row, Col, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import BackButton from '../components/BackButton'
import CustomToast from '../components/CustomToast'
import Loader from '../components/Loader'
import { DELETE_PRODUCT } from '../graphql/product/mutations'
import { GET_ALL_PRODUCTS } from '../graphql/product/queries'
const AdminProductList = () => {
  const [deleted, setDeleted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const { loading: loadingProducts, error, data } = useQuery(GET_ALL_PRODUCTS)
  const [deleteProduct] = useMutation(DELETE_PRODUCT)
  const createProductHandler = () => {}

  const deleteHandler = (id) => {
    setLoading(true)
    deleteProduct({
      variables: {
        id
      },
      refetchQueries: [
        {
          query: GET_ALL_PRODUCTS
        }
      ],
      awaitRefetchQueries: true
    })
      .then((res) => {
        setLoading(false)
        if (res?.data?.deleteProduct?.status === 'success') {
          setDeleted(true)
        }
      })
      .catch((error) => {
        setLoading(false)
        console.log(`delete error `, error)
      })
  }
  useEffect(() => {
    setProducts(data?.getAllProducts)
  }, [data])
  return (
    <Container className="m3">
      {deleted && <CustomToast variant="info" msg="Product Deleted" />}

      <BackButton to="/" />
      <Row className="align-items-center">
        <Col>
          <h3>Products</h3>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus pr-2"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingProducts ? (
        <Loader />
      ) : error ? (
        <>{console.log(`error`, error)}</>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead className="text-center">
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <tr key={product._id} className="text-center">
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td className="lspace-small"> ${product.price} </td>

                  <td>
                    {' '}
                    <LinkContainer
                      to={`/product/${product._id}`}
                      style={{ cursor: 'pointer' }}
                    >
                      <Button variant="light" className="btn-sm">
                        <i className="fa fa-eye"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  )
}

export default AdminProductList
