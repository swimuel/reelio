import React from 'react'
import { Tooltip, Icon } from 'antd'

class TimeRemaining extends React.Component {
  render () {
    return (
      <div>
        <Tooltip placement='right' title={this.props.time + ' left'}>
          <Icon type='clock-circle' />
        </Tooltip>
      </div>
    )
  }
}

export default TimeRemaining
