import React from 'react'
import { Spin, Row, Col, Icon, Card, Button } from 'antd'
import CampaignDetails from '../components/campaign/CampaignDetails'
import { getCampaignById } from '../api'
import { Link } from 'react-router-dom'

import MovieDetails from '../components/movie/MovieDetails'
import './DetailsPage.css'
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
          <Col span={24}>
            <Card bordered={false}>
              <Link to='/'><Icon type='arrow-left' style={styles.backButton} /></Link>
              <div style={styles.heading}>
                {campaign.campaignTitle}
              </div>
            </Card>
          </Col>
        </Row>
        <div className={'details-container'}>
          <div className={'custom-col-1'}>
            <CampaignDetails campaign={campaign} />
          </div>
          <div className={'custom-col-2'}>
            <MovieDetails imdbID={campaign.imdbID} />
          </div>
        </div>
        <div className={'pub-container'}>
          <Button type={'primary'} href={`/campaigns/${campaign._id}/pledge`}>
            Book
            <Icon type='double-right' />
          </Button>
        </div>
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
  },

  heading: {
    fontSize: '3.3em',
    fontWeight: 'bold'
  }
}
