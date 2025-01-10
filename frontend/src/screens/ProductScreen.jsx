import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from 'react-bootstrap'
import axios from "axios";
import Rating from "../components/Rating";

function ProductScreen() {
    const [product, setProduct] = useState({ reviews: [] });
    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/products/${id}`)
            setProduct(data)
        }
        fetchProduct()
    }, [id])


    return (
        <>
            <Link className="my-3 btn btn-light" to={'/'}>Go Back</Link>
            <Row>
                <Col md={5}>
                    <Image src={product.image} alt={product.name} />
                </Col>
                <Col md={4}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.reviews.length} Reviews`} />
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
                            <ListGroup.Item>
                                <Button
                                    type="button"
                                    className="btn-block"
                                    disabled={product.countInStock == 0}
                                > Add to Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>

            </Row>
        </>
    )
}

export default ProductScreen;