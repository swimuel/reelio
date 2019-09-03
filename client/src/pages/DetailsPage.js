import React from 'react'
import { Spin, Row, Col } from 'antd'
import CampaignDetails from '../components/campaign/CampaignDetails'
import { getCampaignById } from '../api'

class DetailsPage extends React.Component {
  state = {
    campaign: null,
    loading: true
  }

  async componentDidMount () {
    const { match } = this.props
    const { id } = match.params
    const campaign = await getCampaignById(id)
    this.setState({ campaign: campaign, loading: false })
  }

  render () {
    const { campaign } = this.state

    // TODO: render campaign details component and pass in id,
    // which then fetches more data for the campaign
    return this.state.loading ? <Spin /> : (
      <div>
        <h1>{campaign.campaignTitle}</h1>
        <Row gutter={16}>
          <Col span={8}>
            <CampaignDetails campaign={campaign} />
          </Col>
          <Col span={8} />
          <Col span={8} />
        </Row>
      </div>
    )
  }
}

export default DetailsPage
