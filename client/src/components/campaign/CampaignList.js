import React from 'react'
import { List, Spin } from 'antd'
import { getCampaigns } from '../../api'
import CampaignCard from './CampaignCard'

import './Campaign.css'

class CampaignList extends React.Component {
  state = {
    loading: true,
    campaings: []
  }

  async componentDidMount () {
    const campaigns = await getCampaigns()
    this.setState({ campaigns: campaigns, loading: false })
  }

  render () {
    return this.state.loading ? <Spin /> : (
      <div className='campaigns-container'>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 4,
            xxl: 5
          }}
          dataSource={this.state.campaigns}
          // renderItem is called with each element in dataSource (which in this case are campaigns).
          // Passing the campaign into a campaign card component will render that specific campaign
          renderItem={campaign => (
            <List.Item>
              <CampaignCard campaign={campaign} />
            </List.Item>
          )}
        />
      </div>
    )
  }
}

export default CampaignList
