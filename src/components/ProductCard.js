import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  return (
    <Card className="my-2" style={{ textColor: 'white' }}>
      <Link to={`/product/${product._id}`}>
        <Card.Img
          style={{ width: '100%', height: '15rem', objectFit: 'cover' }}
          src={product.image}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" style={{ color: '#f0f0f0' }}>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text
          as="div"
          className="d-flex justify-content-between"
        ></Card.Text>

        <Card.Text as="h4">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ProductCard
