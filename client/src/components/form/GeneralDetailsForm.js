import React from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Input, DatePicker, Select, Divider } from 'antd'
import { getCinemas } from '../../api'
import moment from 'moment'

class GeneralDetailsFormClass extends React.Component {
    state = {
      cinemas: [],
      loading: true
    }

    async componentDidMount () {
        // TODO: load this data elsewhere and show loading indicator before rendering form
        const cinemas = await getCinemas()
        this.setState({ cinemas })
      }

      disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().add(1, 'week');
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
    
        return (
          <Form {...formItemLayout}>
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
              })(<Select placeholder="Select a cinema">
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
              })(<Select placeholder="Select a screening time">
                  <Select.Option value="time1">10:30 am</Select.Option>
                  <Select.Option value="time2">2:00 pm</Select.Option>
                  <Select.Option value="time3">6:00 pm</Select.Option>
                  <Select.Option value="time4">8:30 pm</Select.Option>
              </Select>)}
            </Form.Item>
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
          </Form>
        )
      }
    }
    
    const GeneralDetailsForm = Form.create({ name: 'GeneralDetails' })(GeneralDetailsFormClass)
    export default withRouter(GeneralDetailsForm)