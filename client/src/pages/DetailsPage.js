import React from 'react'
import { List, Spin } from 'antd'
import CampaignDetails from '../components/campaign/CampaignDetails'
import { getCampaignById } from '../api'

class DetailsPage extends React.Component {
  state = {
    campaign: null
  }

  async componentDidMount () {
    const { match } = this.props
    const { id } = match.params
    const campaign = await getCampaignById()
    this.setState({ campaign: campaign, loading: false })
  }

  render () {
    const { match } = this.props // contains information from the router
    const { id } = match.params
    const { campaign } = this.state
    

    // TODO: render campaign details component and pass in id,
    // which then fetches more data for the campaign
    return this.state.loading ? <Spin /> : (
    <div>{campaign.filmTitle}
     <CampaignDetails campaign={campaign}></CampaignDetails>
    </div>
      )
  }
}

export default DetailsPage
