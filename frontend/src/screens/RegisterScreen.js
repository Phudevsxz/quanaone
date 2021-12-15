import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userAction'

const RegisterScreen = ({ location, history }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('do not match')
        } else {
            dispatch(register(name, phone, email, password))
        }
        //dispatch register
    }
    return (
        <FormContainer>
            <h1>Đăng Kí</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Tên</Form.Label>
                    <Form.Control type='name' placeholder='Nhập Tên' value={name} onChange={(e) => setName(e.target.value)} >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='phone'>
                    <Form.Label>Phone call</Form.Label>
                    <Form.Control type='Number' placeholder='Nhập sdt' value={phone} onChange={(e) => setPhone(e.target.value)} >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Nhập Email' value={email} onChange={(e) => setEmail(e.target.value)} >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Nhập Password' value={password} onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Password nhap lai</Form.Label>
                    <Form.Control type='password' placeholder='Nhập lai Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Đăng kí
                </Button>
            </Form>

            <Row className="py-3">
                <Col>
                    đã có tài khoản? <Link to={redirect ? `/login?redirect=${redirect}`
                        : '/login'}>đăng nhập ngay!</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
