import React from 'react'
import { List } from 'antd'

class CampaignList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      campaigns: props.campaigns
    }
  }

  render () {
    return (
      <List
        grid={{
          gutter: 16,
          xs: 2,
          sm: 3,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3
        }}
        dataSource={this.state.campaigns}
        renderItem={item => (
          <List.Item>
            {item.render()}
          </List.Item>
        )}
      />
    )
  }
}

export default CampaignList
