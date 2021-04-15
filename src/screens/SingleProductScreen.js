import { useQuery } from '@apollo/client'
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Jumbotron,
  ListGroup,
  Row
} from 'react-bootstrap'
import { useHistory, useParams } from 'react-router'
import BackButton from '../components/BackButton'
import Loader from '../components/Loader'
import Header from '../components/Header'
import { GET_SINGLE_PRODUCT } from '../graphql/product/queries'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { cartState } from '../store/cart'

const SingleProductScreen = () => {
  const { id } = useParams()
  const history = useHistory()
  const [qty, setQty] = useState(1)
  const [cartItems, setCartItems] = useRecoilState(cartState)
  const { loading, data, error } = useQuery(GET_SINGLE_PRODUCT, {
    variables: {
      id: id
    }
  })
  if (error) console.log(`error in single prod`, error)

  const addToCartHandler = () => {
    localStorage.setItem('cartItems', JSON.stringify(data?.getSingleProduct))
    // setCartItems
    history.push(`/cart/${id}?qty=${qty}`)
  }

  return (
    <>
      <Header />
      <Container className="home-container">
        {/* <BackButton to={'/'} /> */}
        {loading ? (
          <Loader />
        ) : (
          <>
            <Row className="force-block">
              <Jumbotron
                className="banner banner-wrap"
                style={{
                  backgroundImage: `url(${data?.getSingleProduct?.bgimage})`,
                  backgroundSize: 'cover',
                  opacity: '0.9',
                  backgroundPosition: 'center center'
                }}
              >
                <div className="jumbotron-content">
                  <BackButton to={'/'} />

                  <h3 className="lspace-small">
                    {data?.getSingleProduct?.name}
                  </h3>
                  <Image
                    style={{
                      width: '25rem',
                      height: 'auto',
                      objectFit: 'cover'
                    }}
                    src={data?.getSingleProduct?.image}
                    alt={data?.getSingleProduct?.name}
                    fluid
                  />
                </div>
              </Jumbotron>

              <Row className="px-4">
                <Col md={4}></Col>
                <Col md={3}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h4>
                        Rating: {'   ' + data?.getSingleProduct?.rating} / 5
                      </h4>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      Description: {data?.getSingleProduct?.description}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>

                <Col md={3}>
                  <Card>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col>Price:</Col>
                          <Col>
                            <strong className="lspace-small">
                              ₹ {'  ' + data?.getSingleProduct?.price}
                            </strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Row>
                          <Col>Status:</Col>
                          <Col>
                            {data?.getSingleProduct?.countInStock > 0
                              ? 'In Stock'
                              : 'Out Of Stock'}
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      {data?.getSingleProduct?.countInStock > 0 && (
                        <ListGroup.Item>
                          <Row>
                            <Col>Qty</Col>
                            <Col>
                              <Form.Control
                                as="select"
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                              >
                                {[
                                  ...Array(
                                    data?.getSingleProduct?.countInStock
                                  ).keys()
                                ].map((x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                ))}
                              </Form.Control>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )}
                      <ListGroup.Item>
                        <Button
                          onClick={addToCartHandler}
                          className="btn-block"
                          type="button"
                          disabled={data?.getSingleProduct?.countInStock === 0}
                        >
                          Add To Cart
                        </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
            </Row>
          </>
        )}
      </Container>
    </>
  )
}

export default SingleProductScreen
