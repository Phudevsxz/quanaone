import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutStep from '../components/CheckoutStep';
import { saveShippingAddress } from '../actions/cartAction';

const ShippingScreen = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        history.push('/payment')
    }

    return (
        <FormContainer>
            <CheckoutStep step1 step2 />
            <h1>Thông tin vận chuyển</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Địa chỉ</Form.Label>
                    <Form.Control type='text' placeholder='Nhập Address' value={address} onChange={(e) => setAddress(e.target.value)} required>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>Thành Phố</Form.Label>
                    <Form.Control type='text' placeholder='Nhập City' value={city} onChange={(e) => setCity(e.target.value)} required>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>Mã Vùng</Form.Label>
                    <Form.Control type='text' placeholder='Nhập Mã vùng' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control type='text' placeholder='Nhập Country' value={country} onChange={(e) => setCountry(e.target.value)} required>
                    </Form.Control>
                </Form.Group>

                <Button type="submit" variant='primary'>Tiếp tục</Button>

            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
