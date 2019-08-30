import React from 'react'
import { Card, Progress, Typography } from 'antd'
import { withRouter } from 'react-router-dom'
import TimeRemaining from './TimeRemaining'
const moment = require('moment')

class CampaignCard extends React.Component {
  calculateTimeRemaining = () => {
    const { campaign } = this.props
    const finishTime = moment(campaign.campaignFinishDate)
    const now = moment()

    const difference = moment.duration(finishTime.diff(now))
    if (Math.trunc(difference.asWeeks()) > 0) {
      return { value: Math.trunc(difference.asWeeks()) + ' weeks', finishSoon: false }
    } else if (Math.trunc(difference.asDays()) > 0) {
      return { value: Math.trunc(difference.asDays()) + ' days', finishSoon: false }
    } else if (Math.trunc(difference.asHours()) > 0) {
      return { value: Math.trunc(difference.asHours()) + ' hours', finishSoon: true }
    } else if (Math.trunc(difference.asMinutes()) > 0) {
      return { value: Math.trunc(difference.asMinutes()) + ' minutes', finishSoon: true }
    } else if (Math.trunc(difference.asSeconds()) > 0) {
      return { value: Math.trunc(difference.asSeconds()) + ' seconds', finishSoon: true }
    } else {
      return 'unknown'
    }
  }

  goToDetails = () => {
    const { history, campaign } = this.props
    history.push(`/campaigns/${campaign._id}`)
  }

  render () {
    const { Paragraph, Title } = Typography
    const { campaign } = this.props
    return (
      <Card
        onClick={this.goToDetails}
        hoverable
        style={{ ...styles.card, ...{ backgroundImage: `url(${campaign.imageUrl})` } }}
        bodyStyle={styles.bodyOverride}
      >
        <div style={styles.screenType}>
          <Paragraph style={{ margin: 0 }}>{campaign.screenType}</Paragraph>
        </div>

        <div style={styles.timeRemaining}>
          <TimeRemaining time={this.calculateTimeRemaining()} />
        </div>

        <div style={styles.subCard}>
          <Title level={4}>{campaign.filmTitle}</Title>
          <Paragraph>{campaign.campaignTitle}</Paragraph>
          <Paragraph>Screening: {moment(campaign.screeningDate).format('Do MMMM')}</Paragraph>
          <Progress percent={campaign.percentageComplete} />
        </div>
      </Card >
    )
  }
}

export default withRouter(CampaignCard)

const styles = {
  card: {
    width: 300,
    height: 440,
    borderRadius: 5,
    backgroundSize: 'cover'
  },
  bodyOverride: { // doing this allows us to treat the body of the card as the entire card
    width: '100%',
    height: '100%',
    position: 'absolute',
    padding: 0
  },
  subCard: {
    position: 'absolute',
    bottom: 15,
    marginLeft: '5%',
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: '18px'
  },
  screenType: {
    position: 'absolute',
    left: 20,
    top: 20,
    padding: 4,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 5
  },
  timeRemaining: {
    position: 'absolute',
    top: 20,
    right: 20
  }
}
