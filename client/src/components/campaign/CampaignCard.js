import React from 'react'
import { Card, Progress } from 'antd'
import TimeRemaining from './TimeRemaining'
const moment = require('moment')

class CampaignCard extends React.Component {
  calculateTimeRemaining = () => {
    const { campaign } = this.props
    const finishTime = moment(campaign.campaignFinishDate)
    const now = moment()

    const difference = moment.duration(finishTime.diff(now))
    if (Math.trunc(difference.asWeeks()) > 0) {
      return Math.trunc(difference.asWeeks()) + ' weeks'
    } else if (Math.trunc(difference.asDays()) > 0) {
      return Math.trunc(difference.asDays()) + ' days'
    } else if (Math.trunc(difference.asHours()) > 0) {
      return Math.trunc(difference.asHours()) + ' hours'
    } else if (Math.trunc(difference.asMinutes()) > 0) {
      return Math.trunc(difference.asMinutes()) + ' minutes'
    } else if (Math.trunc(difference.asSeconds()) > 0) {
      return Math.trunc(difference.asSeconds()) + 'seconds'
    } else {
      return 'unknown'
    }
  }

  render () {
    const { Meta } = Card
    const { campaign } = this.props
    return (
      <Card
        hoverable
        style={{ width: 200, height: 440 }}
        // TODO: include image url in dto
        cover={<img alt='campaign poster' src={campaign.imageUrl} width='200' />}
        extra={<TimeRemaining time={this.calculateTimeRemaining()} />}
      >
        <Meta title={campaign.filmTitle} description={' (' + campaign.screenType + ')'} />
        <Progress percent={campaign.percentageComplete} />
      </Card>
    )
  }
}

export default CampaignCard
