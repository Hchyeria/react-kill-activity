import React, { useEffect, useState, useCallback, lazy, Suspense } from "react";
import PageLoading from "../../components/Loading/index"
import { Skeleton } from 'antd'
import Item from "../../store/item";
import "./index.styl";
import { post, get } from "../../utils/request";
import { success } from "../../utils/Message";
import { Descriptions, Badge, Card, Button, Typography } from "antd";

const AddPromp = lazy(() => import('../../components/AddPromp/index'))
const OrderForm = lazy(() => import('../../components/OrderForm/index'))

const BadgeFactory = (id: number) => {
  if (id === 0) {
    return <Badge status="default" text="no activity" />;
  } else if (id === 1) {
    return <Badge status="success" text="Activity will coming soon" />;
  } else {
    return <Badge status="processing" text="Activating" />;
  }
};

const { Title } = Typography;

const Detail: React.FC<any> = (props: any) => {
  const {
    match: {
      params: { id }
    }
  } = props;
  
  const [itemDetail, setDetail] = useState(Item.detail[id] || {})
  const {
    id: itemId,
    title,
    price,
    stock,
    description,
    sales,
    imgUrl,
    promoStatus,
    promoPrice,
    promoId,
    startDate
  } = itemDetail;
  const [loading, setLoading] = useState(false)
  const [publishLoading, setPublishLoading] = useState(false);
  const [imgSrc, setImgSrc] = useState('')

  const [buttonType, setButtonType] = useState(0);

  const handleClick = useCallback(() => {
    if (buttonType === 0) {
        setButtonType(1);
    }
    setLoading(true);
    const fetchData = async () => {
        const res = await get({
            url: 'order/generateverifycode',
            responseType: 'arraybuffer'
        })
        setImgSrc(res)
        setLoading(false);
    }
    fetchData()
    
  }, []);

  useEffect(() => {
    const postData = async () => {
      const res = await get({
        url: "item",
        params: {
          id
        }
      });
      if (res.status) {
        setDetail(res.data);
        Item.detail[id] = res.data;
      }
    };
    postData();
  }, [id]);

  interface Store {
    [name: string]: string | number | object | boolean;
  }

  const generateToken = async (data: object) => {
    const res = await post({
      url: "order/generatetoken",
      data
    });
    if (res.status) {
      return res.data;
    }
  }

  const handleSynchronous = useCallback(() => {
    const { promoId } = itemDetail
    setPublishLoading(true)
    if (promoId) {
        const postData = async () => {
            const res = await get({
                url: "item/publishpromo",
                params: {
                    id: promoId
                }
            })
            if (res.status) {
                success('Synchronous database successful')
            }
            setPublishLoading(false)
        }
        postData()
    }
    
  }, [promoId])

  const onFinish = useCallback((values: Store) => {
    setLoading(true);
    const { verifyCode, amount } = values;
    const { promoId } = itemDetail
    const itemId = id
    const postData = async () => {
      const promoToken = await generateToken({
        verifyCode,
        itemId,
        promoId
      });
      if (promoToken) {
        const res = await post({
            url: "order/create",
            data: {
                promoToken,
                itemId,
                promoId,
                amount
            }
        });
        if (res.status) {
          success("Order is committed! Wait for latter");
        }
      }
      setLoading(false);
    };
    postData();
  }, [promoId, itemId]);

  return (
    <div className='App'>
      {itemDetail.id ? (
        <div className="detail">
          <Descriptions title="Item Info" bordered>
            <Descriptions.Item label="Product">{title}</Descriptions.Item>
            <Descriptions.Item label="Price">
              {(promoStatus === 2 ? promoPrice : price) + "¥"}
            </Descriptions.Item>
            <Descriptions.Item label="Stock">{stock}</Descriptions.Item>
            <Descriptions.Item label="StartDate">{startDate}
            </Descriptions.Item>
            <Descriptions.Item label="Status" span={3}>
              {BadgeFactory(promoStatus)}
            </Descriptions.Item>
            <Descriptions.Item label="Sales">{sales}</Descriptions.Item>
            <Descriptions.Item label="Description">
              {description}
            </Descriptions.Item>
            <Descriptions.Item label="Image">
              <Card
                style={{ width: 300 }}
                cover={<img alt="cover" src={imgUrl} />}
              ></Card>
            </Descriptions.Item>
          </Descriptions>
          {
            promoStatus === 2
            ? <Suspense fallback={<Skeleton active />}>
                <OrderForm 
                  buttonType={buttonType}
                  handleClick={handleClick}
                  imgSrc={imgSrc}
                  onFinish={onFinish}
                  loading={loading}
                  stock={stock}
                /> 
              </Suspense>
            
            : !promoId && <Suspense fallback={<Skeleton active />}>
                <AddPromp itemId={itemId} /> 
              </Suspense>                        
            
          }
          {
              promoId && 
              <div className='publish-promo'>
                  <Title level={4}>
                  Synchronous Database, in order to keep the consistence between cache and database
                  </Title>
                  <Button  
                    loading={publishLoading}
                    onClick={handleSynchronous}
                  >
                        Synchronous
                </Button>
              </div>
          }
        </div>
      ) : (
        <PageLoading />
      )}
    </div>
  )
};

export default Detail;
