import { Carousel } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const CustomCarousel = ({ topProducts }) => {
  const history = useHistory()
  return (
    <>
      <Carousel className="custom-carousel">
        {topProducts?.getTopRatedProducts.map((product) => (
          <Carousel.Item
            interval={1000}
            onClick={(e) => {
              e.preventDefault()
              history.push(`/product/${product._id}`)
            }}
          >
            <img className="d-block w-100" src={product.image} />
            <Carousel.Caption>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  )
}

export default CustomCarousel
