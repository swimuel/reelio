import React from 'react'
import { Spin, Row, Col, Icon, Card } from 'antd'
import CampaignDetails from '../components/campaign/CampaignDetails'
import { getCampaignById } from '../api'
import { Link } from 'react-router-dom'

import MovieInfo from "../components/movie/MovieInfo"
import MoviePoster from "../components/movie/MoviePoster"

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

    console.log(id)

    // TODO: render campaign details component and pass in id,
    // which then fetches more data for the campaign
    return this.state.loading ? <Spin /> : (
      <div>
        <Row>
          <Col>
            <Card bordered={false}>
              <Link to='/'><Icon type='arrow-left' style={styles.backButton} /></Link>
              <h1>{campaign.campaignTitle}</h1>
            </Card>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <CampaignDetails campaign={campaign} />
          </Col>
          <Col span={16}>
            <MovieInfo title={'Incredibles 2'}>
            </MovieInfo>
          </Col>
        </Row>
      </div>
    )
  }
}

export default DetailsPage

const styles = {
  backButton: {
    float: 'left',
    fontSize: '2em',
    color: '#FF6852'
  }
}
