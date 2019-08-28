import React from 'react'
import { Tooltip, Icon } from 'antd'

class TimeRemaining extends React.Component {
  render () {
    const { value, finishSoon } = this.props.time
    return (
      <div >
        <Tooltip placement='left' title={value + ' left'}>
          <Icon style={{ padding: 8, backgroundColor: finishSoon ? 'rgba(255,0,0,0.5)' : 'rgba(255,255,255,0.5)', borderRadius: 20 }} type='clock-circle' />
        </Tooltip>
      </div>
    )
  }
}

export default TimeRemaining
