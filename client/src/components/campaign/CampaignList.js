import React from 'react'
import { List } from 'antd'

import './Campaign.css'

class CampaignList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      campaigns: props.campaigns
    }
  }

  render () {
    return (
      <div className='campaigns-container'>
        <List
          grid={{
            gutter: 16,
            xs: 2,
            sm: 3,
            md: 4,
            lg: 5,
            xl: 6,
            xxl: 3
          }}
          dataSource={this.state.campaigns}
          renderItem={item => (
            <List.Item>
              {item}
            </List.Item>
          )}
        />
      </div>
    )
  }
}

export default CampaignList
