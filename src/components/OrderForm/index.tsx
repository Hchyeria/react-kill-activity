import React, { memo, lazy, Suspense } from 'react'
import { Form, Input, Col, Button, Row, InputNumber } from "antd";
const WebSocket = lazy(() => import(/* webpackChunkName: 'websocket.chunk' */'../../components/WebSocket'))

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  };
  
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
        span: 24,
        offset: 0
        },
        sm: {
        span: 16,
        offset: 8
        }
    }
};

interface Store {
    [name: string]: string | number | object | boolean
}

interface Props {
    buttonType: number,
    handleClick(): void,
    onFinish(values: Store): void,
    imgSrc: string,
    loading: boolean,
    stock: number
}

const OrderFrom: React.FC<Props> = memo(({ buttonType, handleClick, imgSrc, onFinish, loading, stock }) => {
    const [form] = Form.useForm();
    return (
        <div className='order-form'>
        <Suspense fallback={<div />}>
            <WebSocket />
        </Suspense>
        
        { buttonType 
            ? (

              <Form
                {...formItemLayout}
                form={form}
                name="order"
                onFinish={onFinish}
                scrollToFirstError
              >
                <Form.Item
                    name='amount'
                    label="Amount"
                    rules={[
                        {
                            required: true,
                            message: "Please input the amount you want to buy!"
                        },
                        { 
                            type: "number",
                            min: 1, 
                            max: stock 
                        }
                    ]}
                >
                    <InputNumber />
                    </Form.Item>
                <Form.Item
                    label="verifyCode"
                    name="verifyCode"
                    extra="We must make sure that your are a human."
                >
                    <Row gutter={8}>
                    <Col span={12}>
                        <Form.Item
                            label="verifyCode"
                            name="verifyCode"
                            noStyle
                            rules={[
                                {
                                required: true,
                                message: "Please input the captcha Code you got!"
                                }
                            ]}
                        >
                        <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <img src={imgSrc} onClick={handleClick} alt='captcha' />
                    </Col>
                    </Row>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                    Order
                    </Button>
                </Form.Item>
              </Form>
          
          ) 
          : (
                <Button type="primary" onClick={handleClick} className="buy-button">
                    Buy Now!
                </Button>
            )
        }
        </div>
    )
})

export default OrderFrom