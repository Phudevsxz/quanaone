import React from 'react'
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keyword' content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Chào mừng đến với phú bảo',
    description: 'Bán đồ đẹp nhất',
    keywords: 'quan ao'
}

export default Meta
