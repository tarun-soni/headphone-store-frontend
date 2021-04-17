import { Button, Col, Form, Modal } from 'react-bootstrap'

const CreateProductModal = ({
  submitProduct,
  productData,
  setProductData,
  color,
  setColor,
  ...props
}) => {
  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create a Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col md={12}>
            <Form>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label className="mt-2">Name</Form.Label>
                <Form.Control
                  type="text"
                  value={productData.name}
                  onChange={(e) =>
                    setProductData({ ...productData, name: e.target.value })
                  }
                />
                <Form.Label className="mt-2">Description</Form.Label>
                <Form.Control
                  type="text"
                  value={productData.description}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      description: e.target.value
                    })
                  }
                />
                <Form.Label className="mt-2">Price</Form.Label>
                <Form.Control
                  type="number"
                  value={productData.price}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      price: e.target.value
                    })
                  }
                />
                <Form.Label className="mt-2">Rating (out of 5)</Form.Label>
                <Form.Control
                  as="select"
                  value={productData.rating}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      rating: e.target.value
                    })
                  }
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Form.Control>
                <Form.Label className="mt-2">Count In Stock</Form.Label>
                <Form.Control
                  type="number"
                  value={productData.countInStock}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      countInStock: e.target.value
                    })
                  }
                />
                <Form.Label className="mt-2">
                  Colors Available (drag to select)
                </Form.Label>
                <Form.Control
                  as="select"
                  multiple
                  value={color}
                  onChange={(e) =>
                    setColor(
                      [].slice
                        .call(e.target.selectedOptions)
                        .map((item) => item.value)
                    )
                  }
                >
                  <option value="RED">RED</option>
                  <option value="BLACK">BLACK</option>
                  <option value="YELLOW">YELLOW</option>
                  <option value="WHITE">WHITE</option>
                  <option value="BLUE">BLUE</option>
                  <option value="GREEN">GREEN</option>
                </Form.Control>
                <Form.Label className="mt-2">Product Image Link</Form.Label>{' '}
                <Form.Control
                  type="text"
                  value={productData.image}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      image: e.target.value
                    })
                  }
                />
                <Form.Label className="mt-2">Background Image Link</Form.Label>{' '}
                <Form.Control
                  type="text"
                  value={productData.bgimage}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      bgimage: e.target.value
                    })
                  }
                />
              </Form.Group>
            </Form>
          </Col>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button onClick={submitProduct}>Create</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CreateProductModal
