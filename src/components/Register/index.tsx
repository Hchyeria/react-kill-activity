import React, { useState, useCallback, memo, lazy, Suspense } from "react";
import {  success } from '../../utils/Message'
import {
  Form,
  Input,
  InputNumber,
  Select,
  Col,
  Button,
  Row
} from "antd";
import './index.styl'
import { post } from '../../utils/request'

const WebSocket = lazy(() => import(/* webpackChunkName: 'websocket' */'../../components/WebSocket'))

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
export interface Store {
  [name: string]: string | number | object | boolean;
}

const RegistrationForm = memo((props: any) => {
    const [form] = Form.useForm();
    const [codeLoading, setCodeLoading] = useState(false)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [phone, setPhone] = useState(0)

    const handleSetPhone = useCallback((e) => {
        setPhone(e.target.value)
    }, [])


    const onFinish = useCallback((values: Store) => {
        setSubmitLoading(true)

        const { 
            confirm,
            ...rest
        } = values
        const postData = async () => {
            const res = await post({
                url: 'user/register',
                data: rest
            })
            if (res.status) {
                success("Register successfully!")
            }
            setSubmitLoading(false)
        }
        postData()

    }, []);

    const handleGetCode = useCallback(() => {
        setCodeLoading(true)
        let data = {
            telephone: phone
        }
        const postData = async () => {
            const res = await post({
                url: 'user/getotp',
                data
            })
            if (res.status) {
                success("You will receive code latter")
            }
            setCodeLoading(false)
        }
        postData()
    }, [phone]);


  return (
    <>
      <Suspense fallback={<div />}>
        <WebSocket />
      </Suspense>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
          <Form.Item
              label="Username"
              name="name"
              rules={[{ required: true, message: 'Please input your username!' }]}
          >
              <Input />
          </Form.Item>
        <Form.Item
          name="telephone"
          label="Phone Number"
          rules={[{ required: true, message: "Please input your phone number!" }]}
        >
          <Input style={{ width: "100%"}} onChange={handleSetPhone}/>
        </Form.Item>
        <Form.Item label="Captcha" extra="We must make sure that your are a human.">
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name="otpCode"
                noStyle
                rules={[{ required: true, message: 'Please input the captcha Code you got!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Button
                  loading={codeLoading} 
                  onClick={handleGetCode}
              >
                  Get captcha
              </Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!"
            }
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!"
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              }
            })
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name='age'
          label="Age"
          rules={[{ type: "number", min: 1, max: 99 }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item 
          name="gender"
          label="Gender">
          <Select>
            <Select.Option value="0">female</Select.Option>
            <Select.Option value="1">male</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" loading={submitLoading} >
            Register
          </Button>
        </Form.Item>
      </Form>
    </>
  )
})

export default RegistrationForm
