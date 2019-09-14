import React from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Input, Button, DatePicker, Select } from 'antd'
import { createCampaign, getScreenTypes } from '../../api'

class ExampleFormClass extends React.Component {
  state = {
    screenTypes: []
  }

  async componentDidMount () {
    // TODO: load this data elsewhere and show loading indicator before rendering form
    const screenTypes = await getScreenTypes()
    this.setState({ screenTypes })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
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

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label='E-mail'>
          {/* see https://ant.design/components/form/#this.props.form.getFieldDecorator(id,-options) */}
          {getFieldDecorator('creatorEmail', {
            // see https://ant.design/components/form/#Validation-Rules
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
        <Form.Item label='Campaign title'>
          {getFieldDecorator('campaignTitle', {
            rules: [
              {
                required: true,
                message: 'A campaign title is required'
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label='Screening date'>
          {getFieldDecorator('screeningDate', {
            rules: [
              {
                required: true,
                message: 'A screening date is required'
              }
            ]
          })(<DatePicker />)}
        </Form.Item>
        <Form.Item label='Screen type'>
          {getFieldDecorator('screenType', {
            rules: [
              { required: true,
                message: 'A screen type is required' }
            ]
          })(<Select>
            {this.state.screenTypes.map(st => {
              return <Select.Option
                key={st._id}
                value={st._id}>
                {st.name}
              </Select.Option>
            })}
          </Select>)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

const ExampleForm = Form.create({ name: 'example' })(ExampleFormClass)
export default withRouter(ExampleForm)
