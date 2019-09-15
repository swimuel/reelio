import React from 'react'
import { withRouter } from 'react-router-dom'
import { Spin, Form, Alert, Button, Select } from 'antd'
import { createCampaign, getScreenTypes } from '../../api'
import SeatingChart from '../../assets/seating_chart.png'

class ScreenTypeFormClass extends React.Component {
  state = {
    screenTypes: [],
    selectedType: '',
    loading: true
  }

  async componentDidMount () {
    const screenTypes = await getScreenTypes()
    this.setState({ screenTypes: screenTypes, loading: false })
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
        <Form.Item label='Screen type'>
          {getFieldDecorator('screenType', {
            rules: [
              { required: true,
                message: 'A screen type is required' }
            ]
          })(<Select onChange={this.handleChange}>
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
            console.log(this.props.form)
            const priceMessage = 'The selected type will mean tickets are $' + st.price + ' each'
            const seatsMessage = 'You must sell at least ' + st.numTicketsRequired + ' tickets for this campaign to succeed'
            return this.state.selectedType === st.name
              ? <div>
                <img src={SeatingChart} />
                <Alert message={priceMessage} type='info' showIcon />
                <br />
                <Alert message={seatsMessage} type='info' showIcon />
              </div>
              : null
          })
        }
        <Form.Item {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>
            Next
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

const ScreenTypeForm = Form.create({ name: 'screenType' })(ScreenTypeFormClass)
export default withRouter(ScreenTypeForm)
