import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }
    return (
        <Form onSubmit={submitHandler} className='d-flex'>
            <Form.Control type='text' name="q" onChange={(e) => setKeyword(e.target.value)}
                placeholder="Tìm kiếm sản phẩm...." className='me-sm-1 ms-sm-4'>
            </Form.Control>
            <Button type="submit" variant='outline-success' className='p-2'>Finds</Button>
        </Form>
    )
}

export default SearchBox
