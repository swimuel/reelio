import React from 'react'
import { Tooltip, Icon } from 'antd'

class TimeRemaining extends React.Component {
  render () {
    return (
      <div >
        <Tooltip placement='left' title={this.props.time + ' left'}>
          <Icon style={{ padding: 8, backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 20 }} type='clock-circle' />
        </Tooltip>
      </div>
    )
  }
}

export default TimeRemaining
