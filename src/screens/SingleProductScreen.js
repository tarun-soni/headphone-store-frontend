import { useQuery } from '@apollo/client'
import {
  Col,
  Container,
  Image,
  Jumbotron,
  ListGroup,
  Row
} from 'react-bootstrap'
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
      <Container></Container>
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
                  backgroundImage: `url("https://gavinsgadgets.files.wordpress.com/2016/02/img_4654.jpg?w=604&zoom=2  ")`,
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

              {/* <Col md={6}>
                <ListGroup variant="flush">
                  <h3 className="lspace-small">
                    {data?.getSingleProduct?.name}
                  </h3>
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
              </Col> */}
            </Row>
          </>
        )}
      </Container>
    </>
  )
}

export default SingleProductScreen
