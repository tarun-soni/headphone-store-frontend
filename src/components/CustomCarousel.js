import { Carousel } from 'react-bootstrap'

const CustomCarousel = ({ topProducts }) => {
  return (
    <>
      <Carousel className="custom-carousel">
        {topProducts?.getTopRatedProducts.map((product) => (
          <Carousel.Item interval={1000}>
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
