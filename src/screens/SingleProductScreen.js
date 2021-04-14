import { useQuery } from '@apollo/client'
import { Col, Container, Image, ListGroup, Row } from 'react-bootstrap'
import { useParams } from 'react-router'
import BackButton from '../components/BackButton'
import Loader from '../components/Loader'
import Header from '../components/Header'
import { GET_SINGLE_PRODUCT } from '../graphql/product/queries'

const SingleProductScreen = () => {
  const { id } = useParams()
  const { loading, data, error } = useQuery(GET_SINGLE_PRODUCT, {
    variables: {
      id: id
    }
  })
  if (error) console.log(`error in single prod`, error)
  return (
    <>
      <Header />
      <Container>
        <BackButton to={'/'} />

        {loading ? (
          <Loader />
        ) : (
          <>
            <Row>
              <Col md={6}>
                <Image
                  src={data?.getSingleProduct?.image}
                  alt={data?.getSingleProduct?.name}
                  fluid
                />
              </Col>
              <Col md={6}>
                <ListGroup variant="flush">
                  {/* <ListGroup.Item> */}
                  <h3 className="lspace-small">
                    {data?.getSingleProduct?.name}
                  </h3>
                  {/* </ListGroup.Item> */}
                  <ListGroup.Item>
                    Price: ${data?.getSingleProduct?.price}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Description: {data?.getSingleProduct?.description}
                  </ListGroup.Item>
                </ListGroup>
                <Row
                  md={12}
                  style={{ marginTop: '5rem', justifyContent: 'flex-end' }}
                >
                  <ListGroup variant="flush">
                    <ListGroup.Item className="lspace-small">
                      Price: {data?.getSingleProduct?.price}
                    </ListGroup.Item>
                  </ListGroup>
                </Row>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  )
}

export default SingleProductScreen
