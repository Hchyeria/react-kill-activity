import React, { memo, useCallback, useState } from 'react'
import { Form, Input, Button, InputNumber, Typography } from "antd";
import { success } from '../../utils/Message'
import { post } from '../../utils/request'

const { Title } = Typography 
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


const CreateItem: React.FC = memo((props: any) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = useCallback((values: Store) => {
        setLoading(true)
        const postData = async () => {
            const res = await post({
                url: "item/create",
                data: values
            })
            if (res.status) {
              success("Create successfully");
            }
            setLoading(false)
        }
        postData()
    }, [])

    return (
        <div className='order-form'>
                <Title level={4}>
                    Create Item
                </Title>
              <Form
                {...formItemLayout}
                form={form}
                name="order"
                onFinish={onFinish}
                scrollToFirstError
              >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please input title!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input description!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name='stock'
                    label="Stock"
                    rules={[
                        {
                            required: true,
                            message: "Please input the stock you want to sell!"
                        },
                        { 
                            type: "number",
                            min: 1
                        }
                    ]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    name='price'
                    label="Price"
                    rules={[
                        {
                            required: true,
                            message: "Please input the price you want to sell!"
                        },
                        { 
                            type: "number",
                            min: 1
                        }
                    ]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    label="ImgUrl"
                    name="imgUrl"
                    rules={[{ required: true, message: 'Please input imgUrl!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Create
                    </Button>
                </Form.Item>
              </Form>
        </div>
    )
})

export default CreateItem