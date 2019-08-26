import React from 'react'
import Header from '../components/home/Header'
import CampaignCard from '../CampaignCard'
import CampaignList from '../components/home/CampaignList'
import { getCampaigns } from '../api'

class HomePage extends React.Component {
  state = {
    loading: true,
    campaigns: null
  }

  async componentDidMount () {
    const campaigns = await getCampaigns()
    this.setState({ campaigns: campaigns, loading: false })
  }

  render () {
    return this.state.loading ? <p>TODO: loading indicator</p>
      : <div className={'HomePage'}>
        <Header />
        <CampaignList campaigns={this.state.campaigns.map(e => <CampaignCard props={e} />)} />
      </div>
  }
}

export default HomePage
