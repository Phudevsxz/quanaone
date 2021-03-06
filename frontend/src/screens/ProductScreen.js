import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Rating from "../components/Rating";
import { listProductDetails, createProductReview } from '../actions/productAction';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'


const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { success: successProductReview, error: errorProductReview } = productReviewCreate

    useEffect(() => {
        if (successProductReview) {
            alert('Thêm bình luận thành công')
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match, successProductReview])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(match.params.id, {
            rating,
            comment
        }))
    }

    return (
        <>
            <Link className='btn btn-light my-3' to="/">
                go back
            </Link>
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> :
                (
                    <>
                        <Meta title={product.name} />
                        <Row>
                            <Col md={6}>
                                <Image src={product.image} alt={product.name} fluid />
                            </Col>
                            <Col md={3}>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h3>Tên sản phẩm: {product.name}</h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Giá Sản phẩm: {product.price} VNĐ
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Mô tả: {product.description}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Size: {product.size}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Hãng sản xuất: {product.brand}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Loại: {product.category}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    Giá tiền:
                                                </Col>
                                                <Col>
                                                    <strong>{product.price} VNĐ</strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    Status:
                                                </Col>
                                                <Col>
                                                    {product.countInStock > 0 ? "còn hàng" : "hết hàng"}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        {product.countInStock > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Số lượng:</Col>
                                                    <Col>
                                                        <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                                            {
                                                                [...Array(product.countInStock).keys()].map((x) => (
                                                                    <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                ))
                                                            }

                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}

                                        <ListGroup.Item>
                                            <Button
                                                onClick={addToCartHandler}
                                                className="btn-block"
                                                type="button"
                                                disabled={product.countInStock === 0}>
                                                Thêm vào giỏ hàng
                                            </Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <h2>Đánh giá sản phẩm</h2>
                                {errorProductReview && <Message variant="danger">{errorProductReview}</Message>}
                                {product.reviews.length === 0 && <Message>Không có đánh giá nào</Message>}
                                <ListGroup variant='flush'>
                                    {product.reviews.map(review => (
                                        <ListGroup.Item key={review._id}>
                                            <strong>{review.name}</strong>
                                            <Rating value={review.rating} />
                                            <p>{review.createdAt.substring(0, 10)}</p>
                                            <p>{review.comment}</p>
                                        </ListGroup.Item>
                                    ))}
                                    <ListGroup.Item>
                                        <h2>Bình luận của khách hàng</h2>
                                        {userInfo ? (
                                            <Form onSubmit={submitHandler}>
                                                <Form.Group controlId='rating'>
                                                    <Form.Label>Rating</Form.Label>
                                                    <Form.Control as="select" value={rating}
                                                        onChange={(e) => setRating(e.target.value)}>
                                                        <option value=''>Chọn....</option>
                                                        <option value='1'>1 - Tệ</option>
                                                        <option value='2'>2 - xấu</option>
                                                        <option value='3'>3 - Bình thường</option>
                                                        <option value='4'>4 - Tốt</option>
                                                        <option value='5'>5 - suất xắc</option>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId="comment">
                                                    <Form.Label>BÌNH LUẬN</Form.Label>
                                                    <Form.Control as="textarea" row="3"
                                                        onChange={(e) => setComment(e.target.value)}>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Button type='submit' variant='primary'>
                                                    bình luận
                                                </Button>
                                            </Form>
                                        ) : (
                                            <Message>
                                                Vui lòng <Link to='/login'>Đăng nhập</Link>để viết bình luận
                                                {' '}
                                            </Message>
                                        )}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>
                    </>
                )}
        </>
    )
}

export default ProductScreen
