import React from 'react'
import { withRouter } from 'react-router-dom'
import { Spin, Form, Alert, Select, Input, DatePicker, Divider, Radio } from 'antd'
import './PaymentDetailsForm.css'

class PaymentDetailsFormClass extends React.Component {
  render () {
    const { getFieldDecorator } = this.props.form

    // TODO: adjust these to be responsive
    const formItemLayout = {
      labelCol: {
        xs: { span: 6 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 12 }
      }
    }

    return this.state.loading ? <Spin /> : (
      <Form {...formItemLayout}>
        <h2>Payment</h2>
        <Alert message='You must secure at least one ticket to start the campaign' type='info'
          closeText='Close Now' className={'info-alert'} showIcon />
        <Form.Item label='Number of Tickets'>
          <Select defaultValue='1ticket' className={'ticket-select'}>
            <Select.Option value='1ticket'>1</Select.Option>
            <Select.Option value='2ticket'>2</Select.Option>
            <Select.Option value='3ticket'>3</Select.Option>
            <Select.Option value='4ticket'>4</Select.Option>
            <Select.Option value='5ticket'>5</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label='Payment Type'>
          <Radio.Group defaultValue='a'>
            <Radio.Button value='visa'>Visa</Radio.Button>
            <Radio.Button value='mastercard'>Mastercard</Radio.Button>
            <Radio.Button value='americanExpress'>American Express</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <div className={'card-details'}>
          <Form.Item label='Card Number'>
            {getFieldDecorator('cardNumber', {
              rules: [
                { required: true,
                  message: 'A card number is required' }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label='Card Name'>
            {getFieldDecorator('cardName', {
              rules: [
                { required: true,
                  message: 'A card name is required' }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label='Expiry Date'>
            {getFieldDecorator('expiryDate', {
              rules: [
                {
                  required: true,
                  message: 'An expiry date is required'
                }
              ]
            })(<DatePicker style={{ width: '100%' }} />)}
          </Form.Item>
          <Form.Item label='CVV'>
            {getFieldDecorator('cvvNumber', {
              rules: [
                { required: true,
                  message: 'A CVV number is required' },
                { len: 3,
                  message: 'Please input a valid 3-digit CVV number.'
                }
              ]
            })(<Input />)}
          </Form.Item>
        </div>
        <Divider />
      </Form>
    )
  }
}

const PaymentDetailsForm = Form.create({ name: 'paymentDetails' })(PaymentDetailsFormClass)
export default withRouter(PaymentDetailsForm)
