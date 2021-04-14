import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import Header from '../components/Header'
import Loader from '../components/Loader'
import ProductCard from '../components/ProductCard'
import {
  GET_ALL_PRODUCTS,
  GET_TOP_RATED_PRODS
} from '../graphql/product/queries'
const Homescreen = () => {
  const { error, data: topProducts } = useQuery(GET_TOP_RATED_PRODS)
  const { loading, error: allError, data: allProducts } = useQuery(
    GET_ALL_PRODUCTS
  )

  // useEffect(() => {
  //   console.log(`topProducts`, topProducts)
  //   console.log(`all`, allProducts)
  // }, [topProducts])
  return (
    <>
      <Header />
      <Container className="mt-5">
        <Row>
          <Col md={8}>
            <h3>Our Top Rated Products</h3>
          </Col>
        </Row>

        {loading ? (
          <Loader />
        ) : (
          <>
            <Row>
              {topProducts?.getTopRatedProducts.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
            {/* <Row>
            <Col className="align-self-center">
             
            </Col>
          </Row> */}
          </>
        )}
        <Row>
          <Col md={8}>
            <h3>All Products</h3>
          </Col>
        </Row>

        {loading ? (
          <Spinner animation="border" />
        ) : (
          <>
            <Row>
              {allProducts?.getAllProducts.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
            {/* <Row>
            <Col className="align-self-center">
             
            </Col>
          </Row> */}
          </>
        )}
      </Container>
    </>
  )
}

export default Homescreen
