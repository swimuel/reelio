import React from 'react'
import { withRouter } from 'react-router-dom'
import { Spin, Form, Alert, Button, Select, Input, DatePicker, Divider } from 'antd'
import { createCampaign, getScreenTypes, getCinemas } from '../../api'
import moment from 'moment'

class NewCampaignFormClass extends React.Component {
  state = {
    cinemas: [],
    screenTypes: [],
    selectedType: '',
    loading: true
  }

  async componentDidMount () {
    const cinemas = await getCinemas()
    const screenTypes = await getScreenTypes()
    this.setState({ cinemas: cinemas, screenTypes: screenTypes, loading: false })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(values)
      if (!err) {
        const campaign = {
          ...values,
          screeningDate: values.screeningDate.toDate(),
          // TODO: don't hardcode anything
          filmTitle: 'Spider-Man: Far From Home',
          imageUrl: 'https://m.media-amazon.com/images/M/MV5BMGZlNTY1ZWUtYTMzNC00ZjUyLWE0MjQtMTMxN2E3ODYxMWVmXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg',
          genre: 'Superhero',
          creatorName: 'Marty McFly',
          cinemaName: 'Event Cinemas Newmarket',
          cinemaAddress: '42 Wallaby Way, Sydney',
          imdbID: 'tt6320628'
        }
        createCampaign(campaign).then(created => {
          this.props.history.push(`/campaigns/${created.data._id}`)
        })
      }
    })
  }

  disabledDate (current) {
    // Can not select days before today and today
    return current && current < moment().add(1, 'week')
  }

  handleChange = (event, data) => {
    this.setState({ selectedType: data.props.children })
  }

  render () {
    const { getFieldDecorator } = this.props.form

    // TODO: adjust these to be responsive
    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 8 },
        sm: { span: 8 }
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
          {getFieldDecorator('Cinema', {
            rules: [
              { required: true,
                message: 'A cinema is required' }
            ]
          })(<Select placeholder='Select a cinema'>
            {this.state.cinemas.map(c => {
              return <Select.Option
                key={c._id}
                value={c._id}>
                {c.name}
              </Select.Option>
            })}
          </Select>)}
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
            <Select.Option value='time1'>10:30 am</Select.Option>
            <Select.Option value='time2'>2:00 pm</Select.Option>
            <Select.Option value='time3'>6:00 pm</Select.Option>
            <Select.Option value='time4'>8:30 pm</Select.Option>
          </Select>)}
        </Form.Item>
        <Form.Item label='Screen type'>
          {getFieldDecorator('screenType', {
            rules: [
              { required: true,
                message: 'A screen type is required' }
            ]
          })(<Select placeholder='Select a screen type' onChange={this.handleChange}>
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
          {getFieldDecorator('organiserName', {
            rules: [
              {
                required: true,
                message: 'An organiser name is required'
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label='Email'>
          {getFieldDecorator('organiserEmail', {
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
