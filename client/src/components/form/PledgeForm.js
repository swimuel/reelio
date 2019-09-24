import React from 'react'
import { withRouter } from 'react-router-dom'
import { Spin, Form, Button, Select, Input, DatePicker, Divider, Radio } from 'antd'
import './PaymentDetailsForm.css'
import Seat1 from '../../assets/1seat.PNG'
import Seat2 from '../../assets/2seat.PNG'
import Seat3 from '../../assets/3seat.PNG'
import Seat4 from '../../assets/4seat.PNG'
import Seat5 from '../../assets/5seat.PNG'
import PaymentIcon from 'react-payment-icons'
import moment from 'moment'

class PledgeFormClass extends React.Component {
  state = {
    loading: true,
    tickets: '',
    pledgeDetails: {}
  }

  async componentDidMount() {
    this.setState({ loading: false, tickets: '', pledgeDetails: {} })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err && this.props.canSubmit) {
        console.log("HELLO")
        const pledge = {
          ...values,
          name: values.name,
          email: values.email,
          ticketsPledged: values.ticketsPledged,
          creditCardNumber: values.creditCardNumber,
          creditCardExpiry: values.creditCardExpiry,
          creditCardCVV: values.creditCardCVV,
          creditCardName: values.creditCardName
        }
        this.setState({
          pledgeDetails: pledge
        }, () => {
          this.props.sendDetails(this.state.pledgeDetails)
        })
      }
      console.log(err)
    })
  }

  handleTicketChange = (value) => {
    this.setState({ tickets: value })
  }

  validateExpiry = (rule, value, callback) => {
    if (value) {
      const today = moment()
      if (value.isBefore(today, 'month')) {
        // eslint-disable-next-line
        callback('That expiry date has already passed')
      }
    } else {
      callback()
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { MonthPicker } = DatePicker

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
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 8,
          offset: 0
        },
        sm: {
          span: 8,
          offset: 8
        }
      }
    }

    let seats = ''
    let payment = ''
    let personalDetails = ''
    if (this.state.tickets) {
      if (this.state.tickets === '1') {
        seats =
          <div>
            <Divider />
            <h2>Seats</h2>
            <h3>You have been allocated the following seats</h3>
            <img src={Seat1} alt='' />
            <Divider />
          </div>
      } else if (this.state.tickets === '2') {
        seats =
          <div>
            <Divider />
            <h2>Seats</h2>
            <h3>You have been allocated the following seats</h3>
            <img src={Seat2} alt='' />
            <Divider />
          </div>
      } else if (this.state.tickets === '3') {
        seats =
          <div>
            <Divider />
            <h2>Seats</h2>
            <h3>You have been allocated the following seats</h3>
            <img src={Seat3} alt='' />
            <Divider />
          </div>
      } else if (this.state.tickets === '4') {
        seats =
          <div>
            <Divider />
            <h2>Seats</h2>
            <h3>You have been allocated the following seats</h3>
            <img src={Seat4} alt='' />
            <Divider />
          </div>
      } else if (this.state.tickets === '5') {
        seats =
          <div>
            <Divider />
            <h2>Seats</h2>
            <h3>You have been allocated the following seats</h3>
            <img src={Seat5} alt='' />
            <Divider />
          </div>
      }
      personalDetails =
        <div>
          <h2>Personal Details</h2>
          <Form.Item label='Name'>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: 'Your name is required'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label='Email'>
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'Please input a valid email.'
                },
                {
                  required: true,
                  message: 'Please input your email.'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Divider />
        </div>
      payment =
        <div>
          <h2>Payment</h2>
          <Form.Item label='Payment Type'>
            {getFieldDecorator('paymentType', {
              rules: [
                {
                  required: true,
                  message: 'A payment type is required',
                  initialValue: 'a'
                }
              ]
            })(<Radio.Group>
              <Radio.Button value='visa'>
                <PaymentIcon
                  id='visa'
                  style={{ margin: 10, width: 50 }}
                />
              </Radio.Button>
              <Radio.Button value='mastercard'>
                <PaymentIcon
                  id='mastercard'
                  style={{ margin: 10, width: 50 }}
                />
              </Radio.Button>
              <Radio.Button value='americanExpress'>
                <PaymentIcon
                  id='amex'
                  style={{ margin: 10, width: 50 }}
                />
              </Radio.Button>
            </Radio.Group>)}
          </Form.Item>
          <div className={'card-details'}>
            <Form.Item label='Card Number'>
              {getFieldDecorator('creditCardNumber', {
                rules: [
                  {
                    required: true,
                    message: 'A card number is required'
                  },
                  {
                    len: 16,
                    message: 'Please input a valid 16-digit card number.'
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label='Card Name'>
              {getFieldDecorator('creditCardName', {
                rules: [
                  {
                    required: true,
                    message: 'A card name is required'
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label='Expiry Date'>
              {getFieldDecorator('creditCardExpiry', {
                rules: [
                  {
                    required: true,
                    message: 'An expiry date is required'
                  },
                  { validator: this.validateExpiry }
                ]
              })(<MonthPicker placeholder='Select Month' style={{ width: '100%' }} />)}
            </Form.Item>
            <Form.Item label='CVV'>
              {getFieldDecorator('creditCardCVV', {
                rules: [
                  {
                    required: true,
                    message: 'A CVV number is required'
                  },
                  {
                    len: 3,
                    message: 'Please input a valid 3-digit CVV number.'
                  }
                ]
              })(<Input />)}
            </Form.Item>
          </div>
          <Divider />
          <Form.Item {...tailFormItemLayout}>
            <Button type='primary' htmlType='submit'>
              Pledge
              </Button>
          </Form.Item>
        </div>
    } else {
      seats = ''
      payment = ''
      personalDetails = ''
    }

    return this.state.loading ? <Spin /> : (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <h2>Pledge</h2>
        <Form.Item label='Number of Tickets'>
          {getFieldDecorator('ticketsPledged', {
            rules: [
              {
                required: true,
                message: 'Number of tickets pledged is required'
              }
            ]
          })(<Select placeholder='Select number of tickets' className={'ticket-select'}
            onChange={this.handleTicketChange}>
            <Select.Option value='1'>1</Select.Option>
            <Select.Option value='2'>2</Select.Option>
            <Select.Option value='3'>3</Select.Option>
            <Select.Option value='4'>4</Select.Option>
            <Select.Option value='5'>5</Select.Option>
          </Select>)}
        </Form.Item>

        {seats}
        {personalDetails}
        {payment}

      </Form>
    )
  }
}

const PledgeForm = Form.create({ name: 'newPledge' })(PledgeFormClass)
export default withRouter(PledgeForm)
