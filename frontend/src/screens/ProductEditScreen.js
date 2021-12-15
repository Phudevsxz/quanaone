import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer';
import { listProductDetails, updateProduct } from '../actions/productAction'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import axios from 'axios';

const ProductEditScreen = ({ match, history }) => {
    const productId = match.params.id

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [size, setSize] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)


    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails


    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/productlist')
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setSize(product.size)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
    }, [dispatch, history, productId, product, successUpdate])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
            const { data } = await axios.post('/api/upload', formData, config)

            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        //update product
        //form fill
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            size,
            image,
            brand,
            category,
            description,
            countInStock,
        }))
    }
    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Quay lại
            </Link>
            <FormContainer>
                <h1>Cập nhật Sản phẩm</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Tên</Form.Label>
                            <Form.Control type='name' placeholder='Nhập Tên' value={name} onChange={(e) => setName(e.target.value)} >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='price'>
                            <Form.Label>price</Form.Label>
                            <Form.Control type='number' placeholder='Nhập price' value={price} onChange={(e) => setPrice(e.target.value)} >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control type='text' placeholder='Nhập url' value={image} onChange={(e) => setImage(e.target.value)} >
                            </Form.Control>
                            <Form.Control
                                id='image-file'
                                type="file"
                                label='Choose File'
                                custom
                                onChange={uploadFileHandler}
                            ></Form.Control>
                            {uploading && <Loader />}
                        </Form.Group>

                        <Form.Group controlId='size'>
                            <Form.Label>size</Form.Label>
                            <Form.Control type='text' placeholder='Nhập size' value={size} onChange={(e) => setSize(e.target.value)} >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='brand'>
                            <Form.Label>brand</Form.Label>
                            <Form.Control type='text' placeholder='Nhập brand' value={brand} onChange={(e) => setBrand(e.target.value)} >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='category'>
                            <Form.Label>category</Form.Label>
                            <Form.Control type='text' placeholder='Nhập category' value={category} onChange={(e) => setCategory(e.target.value)} >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='countInStock'>
                            <Form.Label>countInStock</Form.Label>
                            <Form.Control type='Number' placeholder='Nhập countInStock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)} >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label>description</Form.Label>
                            <Form.Control type='text' placeholder='Nhập description' value={description} onChange={(e) => setDescription(e.target.value)} >
                            </Form.Control>
                        </Form.Group>


                        <Button type='submit' variant='primary'>
                            Cập Nhật
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    )
}

export default ProductEditScreen
