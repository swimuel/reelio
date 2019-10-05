import React from 'react'
import { DatePicker, Icon } from 'antd'

class DateRangeFilter extends React.Component {
    state = {
      startDate: null,
      endDate: null
    }

    handleDateChange = (date, isStartDate) => {
      if (isStartDate) {
        this.setState({ startDate: date }, () => {
          this.props.onChange({ startDate: this.state.startDate, endDate: this.state.endDate })
        })
      } else {
        this.setState({ endDate: date }, () => {
          this.props.onChange({ startDate: this.state.startDate, endDate: this.state.endDate })
        })
      }
    }

    render () {
      const { startDate, endDate } = this.state
      return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <DatePicker placeholder={'Select start date'} allowClear value={startDate} onChange={(date) => this.handleDateChange(date, true)} />
        <div style={{ fontSize: 18, paddingRight: 2, paddingLeft: 2 }}><Icon type='minus' style={{ color: 'black' }} /></div>
        <DatePicker placeholder={'Select end date'} allowClear value={endDate} onChange={(date) => this.handleDateChange(date, false)} />
      </div>
    }
}

export default DateRangeFilter
