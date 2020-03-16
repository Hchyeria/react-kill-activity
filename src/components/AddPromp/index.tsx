import React, { memo, useCallback, useState } from 'react'
import { Form, Input, Button, InputNumber, DatePicker, Typography  } from "antd";

import { success } from '../../utils/Message'
import { post } from '../../utils/request'

const { Title } = Typography 
const { RangePicker } = DatePicker;
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
    [name: string]: any
}

interface Props {
    itemId: number
}

const CreatePromp: React.FC<Props> = memo((props) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const { itemId } = props

    const onFinish = useCallback((values: Store) => {
        setLoading(true)
        const { date, ...rest } = values
        const startDate = date[0].format('YYYY-MM-DD HH:mm:ss')
        const endDate = date[1].format('YYYY-MM-DD HH:mm:ss')
        const postData = async () => {
            const res = await post({
                url: "item/addpromp",
                data: {
                    itemId,
                    ...rest,
                    startDate,
                    endDate
                }
            })
            if (res.status) {
              success("Request is committed! Wait for latter");
            }
            setLoading(false)
        }
        postData()
    }, [itemId])

    return (
        <div className='order-form'>
                <Title level={4}>Add this item into activity!!</Title>
              <Form
                {...formItemLayout}
                form={form}
                name="order"
                onFinish={onFinish}
                scrollToFirstError
              >
                <Form.Item
                    label="Activity Title"
                    name="promoName"
                    rules={[{ required: true, message: 'Please input title!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name='promoItemPrice'
                    label="Price"
                    rules={[
                        {
                            required: true,
                            message: "Please input the price you want to sell at activity!"
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
                    label="StartDate EndDate"
                    name="date"
                    rules={[{ required: true, message: 'Please input startDate!' }]}
                >
                    <RangePicker showTime />
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

export default CreatePromp