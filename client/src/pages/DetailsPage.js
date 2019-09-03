import React from 'react'
import { Spin, Row, Col, Icon } from 'antd'
import CampaignDetails from '../components/campaign/CampaignDetails'
import { getCampaignById } from '../api'
import { Link } from 'react-router-dom'

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
        <Row>
          <Col>
            <Link to='/'><Icon type='arrow-left' style={styles.backButton} /></Link>
            <h1>{campaign.campaignTitle}</h1>
          </Col>
        </Row>
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

const styles = {
  backButton: {
    float: 'left',
    fontSize: 30,
    color: '#FF6852',
    padding: 10
  }
}
