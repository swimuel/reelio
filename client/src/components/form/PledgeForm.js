import React from 'react'
import { withRouter } from 'react-router-dom'
import { Spin, Form, Button, Select, Input, DatePicker, Divider, Radio } from 'antd'
import './PaymentDetailsForm.css'
import Seat1 from '../../assets/1seat.PNG'
import Seat2 from '../../assets/2seat.PNG'
import Seat3 from '../../assets/3seat.PNG'
import Seat4 from '../../assets/4seat.PNG'
import Seat5 from '../../assets/5seat.PNG'

class PledgeFormClass extends React.Component {
    state = {
      loading: true,
      tickets: '',
      pledgeDetails: {}
    }

    async componentDidMount () {
      this.setState({ loading: false, tickets: '', pledgeDetails: {} })
    }

    handleSubmit = e => {
      e.preventDefault()
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err && this.props.canSubmit) {
          const pledge = {
            ...values,
            name: values.name,
            email: values.email,
            campaign: values.campaignid,
            ticketsPledged: values.ticketsPledged
          }
          this.setState({
            pledgeDetails: pledge
          }, () => {
            this.props.sendDetails(this.state.pledgeDetails)
          })
        }
      })
    }

    handleTicketChange = (value) => {
      this.setState({ tickets: value })
    }

    render () {
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
      if (this.state.tickets) {
        if (this.state.tickets === 1) {
          seats =
            <div>
              <Divider />
              <h2>Seats</h2>
              <h3>You have been allocated the following seats</h3>
              <img src={Seat1} />
              <Divider />
            </div>
        } else if (this.state.tickets === 2) {
          seats =
            <div>
              <Divider />
              <h2>Seats</h2>
              <h3>You have been allocated the following seats</h3>
              <img src={Seat2} />
              <Divider />
            </div>
        } else if (this.state.tickets === 3) {
          seats =
            <div>
              <Divider />
              <h2>Seats</h2>
              <h3>You have been allocated the following seats</h3>
              <img src={Seat3} />
              <Divider />
            </div>
        } else if (this.state.tickets === 4) {
          seats =
            <div>
              <Divider />
              <h2>Seats</h2>
              <h3>You have been allocated the following seats</h3>
              <img src={Seat4} />
              <Divider />
            </div>
        } else if (this.state.tickets === 5) {
          seats =
            <div>
              <Divider />
              <h2>Seats</h2>
              <h3>You have been allocated the following seats</h3>
              <img src={Seat5} />
              <Divider />
            </div>
        }
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
                <Radio.Button value='visa'>Visa</Radio.Button>
                <Radio.Button value='mastercard'>Mastercard</Radio.Button>
                <Radio.Button value='americanExpress'>American Express</Radio.Button>
              </Radio.Group>)}
            </Form.Item>
            <div className={'card-details'}>
              <Form.Item label='Card Number'>
                {getFieldDecorator('cardNumber', {
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
                {getFieldDecorator('cardName', {
                  rules: [
                    {
                      required: true,
                      message: 'A card name is required'
                    }
                  ]
                })(<Input />)}
              </Form.Item>
              <Form.Item label='Expiry Date'>
                {getFieldDecorator('expiryMonth', {
                  rules: [
                    {
                      required: true,
                      message: 'An expiry date is required'
                    }
                  ]
                })(<MonthPicker placeholder='Select Month' style={{ width: '100%' }} />)}
              </Form.Item>
              <Form.Item label='CVV'>
                {getFieldDecorator('cvvNumber', {
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
      }

      return this.state.loading ? <Spin /> : (
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <h2>Pledge</h2>
          <Form.Item label='Number of Tickets'>
            <Select placeholder='Select number of tickets' className={'ticket-select'}
              onChange={this.handleTicketChange}>
              <Select.Option value='1'>1</Select.Option>
              <Select.Option value='2'>2</Select.Option>
              <Select.Option value='3'>3</Select.Option>
              <Select.Option value='4'>4</Select.Option>
              <Select.Option value='5'>5</Select.Option>
            </Select>
          </Form.Item>

          {seats}
          {payment}

        </Form>
      )
    }
}

const PledgeForm = Form.create({ name: 'newPledge' })(PledgeFormClass)
export default withRouter(PledgeForm)
