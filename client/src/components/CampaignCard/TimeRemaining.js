import React from 'react'
import { Tooltip, Icon } from 'antd'
import { getTime } from '../../api'

class TimeRemaining extends React.Component {
  state = {
    time: null
  }

  async componentDidMount () {
    const time = await getTime()
    this.setState({ time: time })
  }

  render () {
    return (
      <div>
        <Tooltip placement='right' title={this.state.time + ' left'}>
          <Icon type='clock-circle' />
        </Tooltip>
      </div>
    )
  }
}

export default TimeRemaining
