import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from "../components/Rating";
import { useGetProductDetailsQuery } from "../redux/slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../redux/slices/cartSlice";
import { useDispatch } from "react-redux";

function ProductScreen() {
    const { id } = useParams();
    const { data: product, isLoading, error } = useGetProductDetailsQuery(id);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [qty, setQty] = useState(1)

    const addToCartHandler = () => {
        dispatch(addToCart({...product, qty}))
        navigate('/cart')
    }

    return (
        <>
            <Link className="my-3 btn btn-light" to={'/'}>Go Back</Link>

            {isLoading ? <Loader /> : error ? (
                <Message variant='danger'>{error?.data?.message || error.message}</Message>
            ) : (
                <Row>
                    <Col md={5}>
                        <Image src={product.image} alt={product.name} />
                    </Col >
                    <Col md={4}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating value={product.rating} text={`${product.numReviews} Reviews`} />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price : ${product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup varient='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price :</Col>
                                        <Col><strong>${product.price}</strong></Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status :</Col>
                                        <Col><strong>{product.countInStock > 0 ? "Available" : "Sold Out"}</strong></Col>
                                    </Row>
                                </ListGroup.Item>

                                {product.countInStock > 0 && (<ListGroup.Item>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col><Form.Control
                                            as='select'
                                            value={qty}
                                            onChange={e => setQty(Number(e.target.value))}>
                                            {[...Array(product.countInStock).keys()].map(x => (
                                                <option
                                                    key={x + 1}
                                                    value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))
                                            }
                                        </Form.Control></Col>
                                    </Row>
                                </ListGroup.Item>)}
                                <ListGroup.Item>
                                    <Button
                                        type="button"
                                        className="btn-block"
                                        disabled={product.countInStock == 0}
                                        onClick={addToCartHandler}
                                    > Add to Cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>

                </Row >
            )
            }

        </>
    )
}

export default ProductScreen;