import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutStep from '../components/CheckoutStep';
import { savePaymentMethod } from '../actions/cartAction';

const PaymentScreen = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if (!shippingAddress) {
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal');


    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutStep step1 step2 step3 />
            <h1>Thanh toán</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>
                        Chọn phương thức
                    </Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='Paypal'
                            id='Paypal'
                            name='paymentMethod'
                            value='Paypal'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>

                        
                        {/* <Form.Check
                            type='radio'
                            label='Stripe'
                            id='Stripe'
                            name='paymentMethod'
                            value='Stripe'
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check> */}
                    </Col>
                </Form.Group>


                <Button type="submit" variant='primary'>Tiếp tục</Button>

            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
