import { useQuery } from '@apollo/client'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import CustomCarousel from '../components/CustomCarousel'
import CustomToast from '../components/CustomToast'
import Header from '../components/Header'
import Loader from '../components/Loader'
import Logout from '../components/Logout'
import ProductCard from '../components/ProductCard'
import {
  GET_ALL_PRODUCTS,
  GET_TOP_RATED_PRODS
} from '../graphql/product/queries'

const Homescreen = () => {
  const { loading: topLoading, data: topProducts, error: topError } = useQuery(
    GET_TOP_RATED_PRODS
  )
  const { loading, error: allError, data: allProducts } = useQuery(
    GET_ALL_PRODUCTS
  )

  if (allError || topError) {
    console.log(`allError`, allError)
    console.log(`topError`, topError)
  }

  return (
    <>
      <Header />
      <Container className="my-2 home-container">
        {loading || topLoading ? (
          <Loader />
        ) : allError || topError ? (
          <>
            <CustomToast variant="danger" msg="Please Login Again" />
            <Logout />
          </>
        ) : (
          <>
            <CustomCarousel topProducts={topProducts} />

            <Row>
              <Col md={8} className="ml-5">
                <h3>All Products</h3>
              </Col>
              <Row className="mx-5">
                {allProducts?.getAllProducts.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <ProductCard product={product} />
                  </Col>
                ))}
              </Row>
            </Row>
          </>
        )}
      </Container>
    </>
  )
}

export default Homescreen
