import React from 'react'
import { Spin } from 'antd';
import './index.styl'

const PageLoading: React.FC = () => {
    return (
        <div className='page-loading'>
            <Spin />
        </div>
        
    )
}

export default PageLoading