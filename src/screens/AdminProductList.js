import { useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Button, Table, Row, Col, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useRecoilState } from 'recoil'
import BackButton from '../components/BackButton'
import CreateProductModal from '../components/CreateProductModal'
import CustomToast from '../components/CustomToast'
import Loader from '../components/Loader'
import { CREATE_PRODUCT, DELETE_PRODUCT } from '../graphql/product/mutations'
import { GET_ALL_PRODUCTS } from '../graphql/product/queries'

import { userInfoState } from '../store/login'
const AdminProductList = () => {
  const [modalShow, setModalShow] = useState(false)
  const [created, setCreated] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const { loading: loadingProducts, error, data } = useQuery(GET_ALL_PRODUCTS)
  const [deleteProduct] = useMutation(DELETE_PRODUCT)
  const [createProduct] = useMutation(CREATE_PRODUCT)
  const [userInfo] = useRecoilState(userInfoState)
  const [color, setColor] = useState(['RED', 'BLACK'])
  const [productData, setProductData] = useState({
    name: 'Sony Headphones',
    description: 'Bass heavy and for the music lovers',
    rating: 5,
    price: 2599,
    countInStock: 12,
    bgimage:
      'https://images.pexels.com/photos/358103/pexels-photo-358103.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    image:
      'https://images.pexels.com/photos/164710/pexels-photo-164710.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  })

  const createProductHandler = () => {
    setModalShow(true)
  }

  const deleteHandler = (id) => {
    setLoading(true)
    deleteProduct({
      variables: {
        id
      },
      refetchQueries: [{ query: GET_ALL_PRODUCTS }],
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

  const submitProduct = () => {
    createProduct({
      variables: {
        User: userInfo.userId,
        Name: productData.name,
        Image: productData.image,
        Description: productData.description,
        Bgimage: productData.bgimage,
        Rating: productData.rating,
        Price: productData.price,
        CountInStock: productData.countInStock,
        Colors: color
      },
      refetchQueries: [{ query: GET_ALL_PRODUCTS }],
      awaitRefetchQueries: true
    })
      .then((res) => {
        setLoading(false)
        console.log(`res`, res)
        if (res?.data?.createProduct?._id) {
          setCreated(true)
        }
      })
      .catch((error) => {
        setCreated(false)
        console.log(`delete error `, error)
      })

    setModalShow(false)
  }

  useEffect(() => {
    setProducts(data?.getAllProducts)
  }, [data])
  return (
    <Container className="m3">
      {modalShow && (
        <CreateProductModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          submitProduct={submitProduct}
          productData={productData}
          setProductData={setProductData}
          color={color}
          setColor={setColor}
        />
      )}
      {deleted && (
        <CustomToast
          variant="info"
          msg="Product Deleted"
          onClose={() => setDeleted(false)}
        />
      )}
      {created && (
        <CustomToast
          variant="success"
          msg="New Product Created"
          onClose={() => setCreated(false)}
        />
      )}

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
      {loadingProducts || loading ? (
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
