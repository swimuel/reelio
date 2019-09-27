import React from 'react'
import { withRouter } from 'react-router-dom'
import { Spin, Form, Alert, Button, Select, Input, DatePicker, Divider, Radio } from 'antd'
import { getScreenTypes, getCinemas } from '../../api'
import moment from 'moment'
import './PaymentDetailsForm.css'
import PaymentIcon from 'react-payment-icons'

class NewCampaignFormClass extends React.Component {
  state = {
    cinemas: [],
    screenTypes: [],
    selectedType: '',
    loading: true,
    campaignDetails: {},
    selectedCinema: null
  }

  async componentDidMount () {
    const cinemas = await getCinemas()
    const screenTypes = await getScreenTypes()
    this.setState({ cinemas: cinemas, screenTypes: screenTypes, loading: false, campaignDetails: {} })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err && this.props.canSubmit) {
        // Campaign details
        const campaign = {
          ...values,
          campaignTitle: values.campaignTitle,
          screeningDate: values.screeningDate.toDate(),
          screeningTime: values.screeningTime,
          creationDate: Date(),
          creatorName: values.creatorName,
          screenType: values.screenType,
          cinemaName: this.state.cinemas.find(c => c.name === values.cinemaName).name,
          creatorEmail: values.creatorEmail,
          cinemaAddress: this.state.cinemas.find(c => c.name === values.cinemaName).address,
          price: this.state.screenTypes.find(st => st._id === values.screenType).price,
          name: values.creatorName,
          email: values.creatorEmail,
          ticketsPledged: values.numTicketsPledged,
          creditCardNumber: values.cardNumber,
          creditCardExpiry: values.expiryMonth,
          creditCardCVV: values.cvvNumber,
          creditCardName: values.cardName
        }

        this.setState({
          campaignDetails: campaign
        }, () => {
          this.props.sendDetails(this.state.campaignDetails)
        })
      }
    })
  }

  disabledDate (current) {
    // Can not select days before today and today
    return current && current < moment().add(1, 'week')
  }

  handleTypeChange = (event, data) => {
    this.setState({ selectedType: data.props.children })
  }

  handleCinemaChange = (value) => {
    this.state.cinemas.map(c => {
      if (c.name === value) {
        this.setState({ selectedCinema: c })
        this.props.form.setFieldsValue({
          cinemaAddress: c.address,
          screeningTime: null
        })
      }
    })
  };

  validateExpiry = (rule, value, callback) => {
    if (value) {
      const today = moment()
      if (value.isBefore(today, 'month')) {
        // eslint-disable-next-line
        callback('That expiry date has already passed')
      } else {
        callback()
      }
    } else {
      callback()
    }
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

    return this.state.loading ? <Spin /> : (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <h2>Campaign</h2>
        <Form.Item label='Campaign Title'>
          {getFieldDecorator('campaignTitle', {
            rules: [
              {
                required: true,
                message: 'A campaign title is required'
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label='Cinema'>
          {getFieldDecorator('cinemaName', {
            rules: [
              { required: true,
                message: 'A cinema is required' }
            ]
          })(<Select placeholder='Select a cinema' onChange={this.handleCinemaChange}>
            {this.state.cinemas.map(c => {
              return <Select.Option
                key={c.name}
                value={c.name}>
                {c.name}
              </Select.Option>
            })}
          </Select>)}
        </Form.Item>
        <Form.Item label='Cinema Address' style={{ display: 'none' }}>
          {getFieldDecorator('cinemaAddress', {
            initialValue: ''
          })(<Input />)}
        </Form.Item>
        <Form.Item label='Screening Date'>
          {getFieldDecorator('screeningDate', {
            rules: [
              {
                required: true,
                message: 'A screening date is required'
              }
            ]
          })(<DatePicker disabledDate={this.disabledDate} style={{ width: '100%' }} />)}
        </Form.Item>
        <Form.Item label='Screening Time'>
          {getFieldDecorator('screeningTime', {
            rules: [
              { required: true,
                message: 'A screening time is required' }
            ]
          })(<Select placeholder='Select a screening time'>
            {this.state.selectedCinema &&
            this.state.selectedCinema.availableTimes.map(time =>
              <Select.Option key={time} value={time}>{time}</Select.Option>)}
          </Select>)}
        </Form.Item>
        <Form.Item label='Screen type'>
          {getFieldDecorator('screenType', {
            rules: [
              { required: true,
                message: 'A screen type is required' }
            ]
          })(<Select placeholder='Select a screen type' onChange={this.handleTypeChange}>
            {this.state.screenTypes.map(st => {
              return <Select.Option
                key={st._id}
                value={st._id}>
                {st.name}
              </Select.Option>
            })}
          </Select>)}
        </Form.Item>
        {
          this.state.screenTypes.map(st => {
            const priceMessage = 'The selected type will mean tickets are $' + st.price + ' each'
            const seatsMessage = 'You must sell at least ' + st.numTicketsRequired + ' tickets for this campaign to succeed'
            return this.state.selectedType === st.name
              ? <div>
                <Alert message={priceMessage} type='info' showIcon />
                <br />
                <Alert message={seatsMessage} type='info' showIcon />
              </div>
              : null
          })
        }
        <Divider />
        <h2>Organiser</h2>
        <Form.Item label='Name'>
          {getFieldDecorator('creatorName', {
            rules: [
              {
                required: true,
                message: 'An organiser name is required'
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label='Email'>
          {getFieldDecorator('creatorEmail', {
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
        <h2>Payment</h2>
        <Alert message='You must secure at least one ticket to start the campaign' type='info'
          className={'info-alert'} showIcon />
        <Form.Item label='Number of Tickets'>
          {getFieldDecorator('numTicketsPledged', {
            rules: [],
            initialValue: '1'
          })(<Select className={'ticket-select'}>
            <Select.Option value='1'>1</Select.Option>
            <Select.Option value='2'>2</Select.Option>
            <Select.Option value='3'>3</Select.Option>
            <Select.Option value='4'>4</Select.Option>
            <Select.Option value='5'>5</Select.Option>
          </Select>)}
        </Form.Item>
        <Form.Item label='Payment Type'>
          {getFieldDecorator('paymentType', {
            rules: [
              { required: true,
                message: 'A payment type is required',
                initialValue: 'a' }
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
            {getFieldDecorator('cardNumber', {
              rules: [
                { required: true,
                  message: 'A card number is required' },
                { len: 16,
                  message: 'Please input a valid 16-digit card number.'
                }
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
            {getFieldDecorator('expiryMonth', {
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
        <Form.Item {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>
      Submit
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

const NewCampaignForm = Form.create({ name: 'newCampaign' })(NewCampaignFormClass)
export default withRouter(NewCampaignForm)
