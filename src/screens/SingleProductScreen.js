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
  const [cart, setCart] = useRecoilState(cartState)
  const { loading, data, error } = useQuery(GET_SINGLE_PRODUCT, {
    variables: {
      id: id
    }
  })
  if (error) console.log(`error in single prod`, error)

  const addToCartHandler = () => {
    const item = {
      product: id,
      name: data?.getSingleProduct?.name,
      image: data?.getSingleProduct?.image,
      price: data?.getSingleProduct?.price,
      countInStock: data?.getSingleProduct?.countInStock,
      qty
    }

    const existItem = cart.cartItems.find((x) => x.product === item.product)

    if (existItem) {
      setCart({
        ...cart,
        cartItems: cart.cartItems.map((x) =>
          x.product === existItem.product ? item : x
        )
      })
    } else {
      setCart({
        ...cart,
        cartItems: [...cart.cartItems, item]
      })
    }

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
                    <ListGroup.Item>
                      Colors Available{' '}
                      {data?.getSingleProduct?.colors.map((c) => (
                        <Color color={c} />
                      ))}
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

const Color = ({ color }) => {
  const C = {
    RED: '#DD4949',
    WHITE: '#FAFAFA',
    BLACK: '#222',
    BLUE: '#4C82EB',
    YELLOW: '#E9EC5A',
    GREEN: '#4BE551'
  }
  return (
    <svg
      style={{
        margin: '0.2rem'
      }}
      width="30"
      height="81"
      viewBox="0 0 81 81"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="40.5"
        cy="40.5"
        r="39"
        // fill={`${colorToPass}`}
        fill={C[color]}
        stroke="#DBDBDB"
        stroke-width="5"
      />
    </svg>
  )
}
