import React, { memo, useState, useEffect } from 'react'
import './index.styl'
import { Link } from 'react-router-dom'
import { EllipsisOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Card } from 'antd';
const { Meta } = Card;

interface CardProps {
    title: string,
    price: number,
    stock: number,
    description: string,
    sales: number,
    imgUrl: string,
    promoStatus: number,
    loading: boolean,
    id: number
}

const descriptionNode = (description: string, promoStatus: number) => {
    return (
        <>
            <div className='description'>
                { description }
            </div>
            <div>
                {
                    promoStatus === 1
                    ? 'the item will in buying activity' 
                    : <div className='buying-activity'>
                        in buying activity now
                    </div>
                    
                }
            </div>
        </>
        
    )
}

const CardBox: React.FC<CardProps> = memo((props) => {
    const [loading, setLoading] = useState(true);
    const { 
        title, 
        description, 
        imgUrl, 
        promoStatus,
        id
    } = props

    useEffect(() => {
        if (loading) {
            setTimeout(() => setLoading(false), 500)
        }
    }, []);

    return (
        <div className='card-box'>
            <Link to={`/detail/${id}`} >
                <Card
                    loading={loading}
                    hoverable
                    cover={
                        <img
                            alt="cover"
                            src={imgUrl}
                        />
                    }
                    actions={[
                        <ShoppingCartOutlined key='shop'/>,
                        <EllipsisOutlined key="ellipsis" />
                    ]}
                >
                    <Meta
                        title={title}
                        description={
                            promoStatus === 0 
                            ? description 
                            : descriptionNode(description, promoStatus)
                        }
                    />
                </Card>
            </Link>
            
        </div>
        
    )
})

export default CardBox;