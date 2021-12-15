import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders } from '../actions/orderAction';

const OrderListScreen = ({ history }) => {
    const dispatch = useDispatch()
    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo])

    return (
        <>
            <h1>đơn hàng</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Người dùng</th>
                            <th>ngày</th>
                            <th>Tổng giá</th>
                            <th>Thanh toán</th>
                            <th>Vận chuyển</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>
                                    {order.createdAt.substring(0, 10)}
                                </td>
                                <td>
                                    {order.totalPrice}VNĐ
                                </td>
                                <td>
                                    {order.isPaid ? (order.paidAt.substring(0, 10)) :
                                        (<i className='fas fa-times' style={{ color: 'red' }}></i>)
                                    }
                                </td>
                                <td>
                                    {order.isDelivered ? (order.deliveredAt.substring(0, 10)) :
                                        (<i className='fas fa-times' style={{ color: 'red' }}></i>)
                                    }
                                </td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button variant='light' className='btn-sm'>
                                            Chi tiet
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default OrderListScreen